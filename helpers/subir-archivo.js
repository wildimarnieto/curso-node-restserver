const path = require('path');
const { v4: uuidv4 } = require('uuid');

 const subirArchivo = (files,extensionesValidas =['png','PNG','jpg','JPG','jpeg','JPEG','gif','GIF'],carpeta='' ) =>{

    return new Promise((resolve, reject)=>{

        const {archivo} = files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    

    if (!extensionesValidas.includes(extension)) {
        return reject(`la extencion ${extension} no es permitida, ${extensionesValidas}`)
        
      }
    
    
    nombretemp=uuidv4()+'.'+extension;


  
    const uploadPath = path.join( __dirname , '../uploads/' , carpeta , nombretemp);
  
    archivo.mv(uploadPath, (err) => {
      if (err) {
           
        reject(err)
        
      }
  
      resolve(nombretemp)
    }); 



    })
    

 }

 module.exports = {
     subirArchivo
 }