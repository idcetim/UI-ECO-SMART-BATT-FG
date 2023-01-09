
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const WarningModal = ({ openAlertModal, setOpenAlertModal }) => {

  const handleClose = () => {
    setOpenAlertModal({
      status: false,
      text: ''
    });
  };

  return (
    <div>
      <Dialog
        open={openAlertModal.status}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ background: "rgba(249,212,8,0.5)", width: "320px" }}>
          <DialogTitle id="alert-dialog-title" sx={{ color: "#740600", fontFamily: "Roboto", fontWeight: "bold" }}>
            {" ❌ Error al borrar"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#740600", fontFamily: "Roboto", fontWeight: "400" }}>
              {Array.isArray(openAlertModal.text)
                ? openAlertModal.text.map((line, i) => <p key={i}>  {line}</p>)
                : <p> {openAlertModal.text}</p>
              }
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ mt: "1px" }} >
            <Button onClick={handleClose} sx={{ color: "#740600", fontFamily: "Roboto", fontWeight: "bold" }}>CERRAR</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default WarningModal