import { OPEN_DRAWER, CLOSE_DRAWER } from "../Types/AdminControlType"

export const openDrawer = (title, content) => ({
    type: OPEN_DRAWER,
    title,
    content
});

export const closeDrawer = () => ({
    type: CLOSE_DRAWER,
})
