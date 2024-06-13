function iniitialize() {
    let sharebutton = document.querySelectorAll("button.share-button");
    let dialog = document.getElementById("share-popup");

    document.addEventListener("keyup", (event) => {
        if (event.key === 'Escape') {
            if (dialog.style.visibility !== 'hidden') {
                sharebutton.forEach((btn) => {
                    btn.classList.remove("active");
                })
                dialog.style.visibility = 'hidden';
                dialog.style.opacity = 0;
            }
        }
    });

    sharebutton.forEach((btn) => btn.addEventListener("click", function() {
            btn.classList.toggle("active");
            if (btn.classList.contains("active")) {
                dialog.style.visibility = 'visible';
                dialog.style.opacity = 1;
            } else {
                dialog.style.visibility = 'hidden';
                dialog.style.opacity = 0;
            }
        }
    ));
}

document.addEventListener('DOMContentLoaded', iniitialize);