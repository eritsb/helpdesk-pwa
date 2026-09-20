const menuButton = document.querySelector("#menuButton");
const sidebar = document.querySelector("#sidebar");

menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar--open");
});

document.addEventListener("click", (event) => {
    const clickedInsideSidebar = sidebar.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (
        !clickedInsideSidebar &&
        !clickedMenuButton &&
        sidebar.classList.contains("sidebar--open")
    ) {
        sidebar.classList.remove("sidebar--open");
    }
});