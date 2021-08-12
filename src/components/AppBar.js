import React, {useEffect, useState} from "react"
import {Button, Container, FormControl, FormControlLabel, FormLabel, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import {RadioGroup} from "@material-ui/core";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: "block"
    }
})


const Notes = () => {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/notes')
            .then(res => res.json())
            .then(data => setNotes(data))
    }, [])

    return (
        <div>
            {notes.map(note => (
                <p key={note.id}>
                    {note.title}
                </p>
            ))}
        </div>
    )
}

const Create = () => {

    const classes = useStyles()
    const history = useHistory()
    const [category, setCategory] = useState('money')
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [titleError, settitleError] = useState(false)
    const [detailsError, setDetailsError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
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
            fetch('http://localhost:8000/notes', {
                method: 'POST',
                headers: {'Content-type': "application/json"},
                body: JSON.stringify({title, details, category})
            }).then(() => history.push("/"))
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
              error={titleError}
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
              error={detailsError}
              >
              </TextField>

               <FormControl className={classes.field}>
                   <FormLabel> Note Category  </FormLabel>
                       <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                           <FormControlLabel value={"money"} control={<Radio></Radio>} label={"Money"}></FormControlLabel>
                           <FormControlLabel value={"todos"} control={<Radio></Radio>} label={"Todos"}></FormControlLabel>
                           <FormControlLabel value={"reminders"} control={<Radio></Radio>} label={"Reminders"}></FormControlLabel>
                           <FormControlLabel value={"work"} control={<Radio></Radio>} label={"Work"}></FormControlLabel>
                       </RadioGroup>
               </FormControl>
               <Button
                   type="submit"
                   color="secondary"
                   variant="contained"
                   endIcon={<KeyboardArrowRight></KeyboardArrowRight>}
               >
                   Submit
               </Button>
           </form>

       </Container>
    );
}

export {Create, Notes}