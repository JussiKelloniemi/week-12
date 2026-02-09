import { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'


const fetchData = async (name: string, author: string, pages: number) => {
    try{
        const response = await fetch("http://localhost:3000/api/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                author: author,
                pages: Number(pages)
            })
        })

        if (!response.ok) {
            throw new Error("Error fetching data")
        }

        const data = await response.json()
        console.log(data)

    } catch (error) {
        if (error instanceof Error){
            console.log(`Error when trying to log book: ${error.message}`)
        }
    }
}


const Form = () => {
    const [name, setName] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [pages, setPages] = useState<string>('')

    return (
        <div>
            <h2>Form</h2>
            <Box
                component="form"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    required
                    id="outline-required"
                    label="Name"
                    defaultValue=""
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    required
                    id="outline-required"
                    label="Author"
                    defaultValue=""
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <TextField
                    required
                    id="outline-required"
                    label="Pages"
                    type="number"
                    defaultValue=""
                    onChange={(e) => setPages(e.target.value)}
                />
                <Button variant="contained" sx={{ width: '25ch', m: 1 }} color="primary" onClick={() => fetchData(name, author, Number(pages))}>Submit</Button>
            </Box>
        </div>
        
    )
}

export default Form