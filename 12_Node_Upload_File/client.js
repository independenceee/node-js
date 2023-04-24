import React from "react";
import {useState} from "react"
import axios from "axios";

const FileUpload = function() {
    const [file, setFile] = useState(null)

    const changeInput = function(event) {
        console.log(event.target.files);
       setFile(event.target.files[0]);
    }

    const handleSubmit = function(event) {
        event.preventDefault();

        const data = new FormData();
        data.append("file", file);
        axios.post("http://localhost:8000/upload", data)
                .then((e) => {
                    console.log("Success");
                })
                .catch((error) => {
                    console.log(error);
                })


    }
    return (
        <form>
            <div>
                <label>Upload File</label>
                <input 
                onChange={changeInput}
                type="file"
                />
            </div>

            <button onClick={handleSubmit}>Submit</button>
        </form>
    )
}


export default FileUpload;



// import React from "react";
// import {useState} from "react"
// import axios from "axios";

// const FileUpload = function() {
//     const [files, setFiles] = useState([])

//     const changeInput = function(event) {
//         console.log(event.target.files);
//        setFiles(event.target.files);
//     }

//     const handleSubmit = function(event) {
//         event.preventDefault();

//         const data = new FormData();


//         for(let index = 0;index < files.length; index++ ) {
//             data.append("file", files[index]);

//         }



//         axios.post("http://localhost:8000/upload", data)
//                 .then((e) => {
//                     console.log("Success");
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 })


//     }
//     return (
//         <form>
//             <div>
//                 <label>Upload File</label>
//                 <input 
//                 onChange={changeInput}
//                 type="file"
//                 multiple
//                 />
//             </div>

//             <button onClick={handleSubmit}>Submit</button>
//         </form>
//     )
// }


// export default FileUpload;