import { connect } from 'react-redux';
import Notes form './Notes';
import * as noteActions from '../Note/NoteActions';

const mapDispatchToProps = {
  ...noteActions,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);
