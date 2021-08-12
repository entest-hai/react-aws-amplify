import React, {useState} from "react"
import { Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: "block"
    }
})


const Create = () => {

    const classes = useStyles()
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [titleError, settitleError] = useState(false)
    const [detailsError, setDetailsError] = useState(false)
    const handleSubmit = (e) => {
        console.log("Handle submit form")
        settitleError(false)
        setDetailsError(false)
        
        if (title=='') {
            settitleError(true)
        }

        if (details==''){
            setDetailsError(true)
        }

        if (title && details) {
            console.log(title, details)
        }
    }


    return (
       <Container size='sm'>
           <Typography
           variant="h6"
           color="textSecondary"
           component="h2"
           gutterBottom
           >
               Create a New Note
           </Typography>
           <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField className={classes.field}
              onChange={(e) => setTitle(e.target.value)}
              label="Note Title"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              >
              </TextField>
              <TextField
              className={classes.field}
              label="Details"
              onChange={(e) => setDetails(e.target.value)}
              variant="outlined"
              color="secondary"
              multiline
              rows={4}
              fullWidth
              required
              >

              </TextField>
           </form>
           <Button 
            onClick={()=>console.log("You click me")}
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={<KeyboardArrowRight></KeyboardArrowRight>}
           >
               Submit
           </Button>
       </Container>
    );
}

export default Create;