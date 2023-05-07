import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { updateStatus } from '../../../actions/user';
import { connect, useDispatch } from 'react-redux';

const UsersActions = ({ params, rowId, setRowId, currentUser }) => {
  const  dispatch  = useDispatch()
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(async ()=>{
        const { role, active, _id } = params.row;
        const result = await updateStatus({ role, active }, _id, dispatch, currentUser);
        if (result) {
          setSuccess(true);
          setRowId(null);
        }
        setLoading(false);
    }, 1500)
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

function mapStateToProps(state) {
  console.log(state)
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(UsersActions);