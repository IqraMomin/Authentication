import Greeting from "./Greeting";
import { render,screen } from "@testing-library/react";

describe("Greeting Component",()=>{
    test("renders heading text",()=>{
        render(<Greeting/>)
        const headingElement = screen.getByText(/helloworld/i)
        expect(headingElement).toBeInTheDocument()
    })
})