import { connect } from 'react-redux';
import Message from '../components/message';

const mapStateToProps = state => (
    {
        message: state.dog.get('hasBarked') ? 'The dog barked' : 'The dog did not bark',
    }
);

export default connect(mapStateToProps)(Message);