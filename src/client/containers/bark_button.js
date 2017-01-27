import { connect } from 'react-redux';
import Button from '../components/button';
import { makeBark } from '../actions/dog_actions';

const mapDispatchToProps = dispatch => (
    {
        action: () => { dispatch(makeBark()); },
        actionLabel: 'Bark',
    }
);

export default connect(null,mapDispatchToProps)(Button);