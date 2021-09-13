export const modal = (id) => {
    if (id !== "") {
        const modal = document.querySelector(`#${id}`);
        modal.removeAttribute("style");
        modal.classList.remove("show");
    }
}

// export const validationClass = (className,contact) =>{
//     const field = this.$v.contact[className];
//     if (field) return { "md-invalid": field.$invalid && field.$dirty };
// },