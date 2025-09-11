export const perspective = {
    initial: {
        scale: 1,
        y: 0,
    },
    enter: {
        scale: 1,
        y: 0,
    },
    exit: {
        scale: 0.9,
        y: -150,
        opacity: 0.5,
        transition: {
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1]
        }
    }
}

export const slide = {
    initial: {
        y: "100vh",
    },
    enter: {
        y: "100vh"
    },
    exit: {
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.4
        }
    }
}

export const opacity = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 1,
        transition: {
            duration: 1
        }
    },
    exit: {
        opacity: 1
    }
}