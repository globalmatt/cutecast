import { render, screen } from "@testing-library/react";
import config from "../config.json";
import getIconImage from "./getIconImage";

test("Returns correct JSX element for testicon", () => {
    render(getIconImage("testicon"));
    const el = screen.getByAltText("testicon");
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass("icon");
    expect(el).toHaveAttribute("src", `${config.iconsUrl}/testicon@2x.png`);
});
