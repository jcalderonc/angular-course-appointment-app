import { AppComponent } from "./app.component";

describe("AppComponent", () => {

  it('Should have a title', () => {
    const component = new AppComponent();
    expect(component.title).toBeDefined();

  });
});