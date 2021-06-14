function isTouchScreen() {
    return window.matchMedia('(hover: none)').matches;
}

export default isTouchScreen;