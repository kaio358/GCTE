import { useRef } from "react";
import styles from "./InputFileImage.module.css"
function InputFileImage() {
    const pictureImage = useRef()
    // const inputFile = document.querySelector("#picture__input");
    // const pictureImage = document.querySelector(".picture__image");
    // const pictureImageTxt = "Choose an image";
    // pictureImage.textContent = pictureImageTxt

    // inputFile.addEventListener("change", function (e) {
    // const inputTarget = e.target;
    // const file = inputTarget.files[0];

    // if (file) {
    //     const reader = new FileReader();

    //     reader.addEventListener("load", function (e) {
    //     const readerTarget = e.target;

    //     const img = document.createElement("img");
    //     img.src = readerTarget.result;
    //     img.classList.add("picture__img");

    //     pictureImage.textContent = "";
    //     pictureImage.appendChild(img);
    //     });

    //     reader.readAsDataURL(file);
    // } else {
    //     pictureImage.innerHTML = pictureImageTxt;
    // }
    // });

    function carrega(e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];
        if (file) {
                const reader = new FileReader();
        
                reader.addEventListener("load", function (e) {
                const readerTarget = e.target;
        
                const img = document.createElement("img");
                img.src = readerTarget.result;
                img.classList.add("picture__img");
        
                pictureImage.textContent = "";
                pictureImage.appendChild("<h1>teste</h1>");
                });
        
                reader.readAsDataURL(file);
            } else {
                pictureImage.innerHTML = "";
            }
    } 

    return(
        <div>
            <label class={styles.picture} for="picture__input" tabIndex="0">
                <span ref={pictureImage} class={styles.picture__image}>Escolha a imagem</span>
            </label>

            <input type="file" name="picture__input" id="picture__input" onChange={carrega}></input>
        </div>
      
    )
}

export default InputFileImage