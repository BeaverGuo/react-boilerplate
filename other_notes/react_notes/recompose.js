/*Higher order components
(Component) => EnhancedComponent
(arg1, arg2) => (Component) => EnhancedComponent
Curry & Partial Application
Application: The process of applying a function to its arguments in order to produce a return value
Partial Application: The process of applying a function to some of its arguments.It takes a function with multiple parameters and returns a function with fewer parameters.

Add(x,y) = x + y
Add2 = Partial(Add, 7)

Curry: A function that takes a function with multiple parameters as input and returns a function with exactly on parameter.

f(x,y,x) curried to f: x => (y => （z =>n)))

*/

var isGreaterThan = (limit) => (value) => value > limit

//react-redux

const EnhancedComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Component)

(arg1, arg2) => (Component) => EnchancedComponent

//relay

export default Relay.createContainer(Todo, {
    fragments: {
        todo: () => Relay.QL`
        fragment on Todo {
            complete,
            id,
            text
        }`
    }
})

(Component, arg1) => EnchancedComponent

// Combine simple functions, in return build more complicated once
// function composition

const Commit = ({ sha, message }) => (
    <div>
        <p>{sha}</p>
        <p>{message}</p>
    </div>
)

class CommitContainer extends React.Component {
    state = { commit: null }
    componentDidMount() {
        fetch(`/commits/${this.props.id}`)
            .then(commit => this.setState({ commit }))
    }

    render() {
        const { commit } = this.state
        return <Commit {...this.props} {...commit} />
    }
}


const fetchCommit = (WrappedComponent) => {
    class extends React.Component {
        state = { commit: null }
        componentDidMount() {
            fetch(`/commits/${this.props.id}`)
                .then(commit => this.setState({ commit }))
        }
        render() {
            const { commit } = this.state
            return <WrappedComponent {...this.props} {...commit} />
        }
    }
}

const CommitContainer = fetchCommit(Commit)

const fetchResource = (path) => (WrappedComponent) => (
    class extends React.Component {
        state = { resource: null }
        componentDidMount() {
            path(this.props)
                .then(resource => this.setState( { resource }))
        }

        render() {
            const { resource } = this.state
            return <WrappedComponent {...this.props} {...resource} />
        }
    }
)

const fetchPost = fetchResource(props =>
    fetch(`/commits`${props.id}))
const CommitContainer = fetchPost(Commit)


const fetchGithubOwner = fetchResource(props =>
    fetch(`/owners/${props.id}`)
)

const OwnerContainer = fetchGithubOwner(Owner)

//Props Proxy
const withUser = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            const user = {
                id: `1337`,
                name: `Pacman`
            }
            return (
                <WrappedComponent
                    {...this.props}
                    user={user}
                />
            )
        }
    }
}

//<Props manipulation>

//Inheritance Inversion
//<Render hijacking>

function iiHOC(WrappedComponent) {
    return class Enchancer extends WrappedComponent {
        render() {
            return super.render()
        }
    }
}

function authLocked(WrappedComponent) {
    return class Enchancer extends WrappedComponent {
        render() {
            if(this.props.loggedIn) {
                return super.render()
            } else {
                return null
            }
        }
    }
}

//<State manipulation>

export function debug(WrappedComponent) {
    return class Enchancer extends WrappedComponent {
        render() {
            return (
                <div>
                    <h2>Debugger Component</h2>
                    <p>Props</p> <pre>{JSON.stringify(this.props, null, 2)}</pre>
                    <p>State</p> <pre>{JSON.stringify(this.state, null, 2)}</pre>
                    {super.render()}
                </div>
            )
        }
    }
}

/*What can you do with HoC?
Code reuse
Logic abstraction
//props proxy
Props manipulation
State abstraction
//Inheritance Inversion
Render hijacking
state manipulation



compose
*/
const BaseComponent = (props) => {...}

let EnchancedComponent = firstHoc(BaseComponent)
EnchancedComponent = secondHoc(/*...args*/)(EnchancedComponent)
EnchancedComponent = thirdHoc(/*...args*/)(EnchancedComponent)

const enhance = compose(
    thirdHoc(/*...args*/),
    seconddHoc(/*...args*/),
    firstHoc
)

const EnchancedComponent = enhance(BaseComponent)

function compose(...funcs) {
    if(funcs.length === 0) {
        return arg => arg
    }

    if(funcs.length === 1) {
        return funcs[0]
    }

    const last = funcs[funcs.length - 1]
    return (...args) => {
        let result = last(...args)
        for(let i = funcs.length - 2; i >= 0; i-- ) {
            const f = funcs[i]
            result = f(result)
        }

        return result
    }
}



