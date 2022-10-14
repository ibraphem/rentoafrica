import Alert from 'react-bootstrap/Alert';

const Alerts = ({type="danger", showAlert, closeAlert, heading, message, }) => {
    return (
       showAlert && (
        <Alert variant={type} onClose={closeAlert} dismissible>
        <Alert.Heading>{heading}</Alert.Heading>
        <p>
          {message}
        </p>
      </Alert>
       )
    );
};

export default Alerts;