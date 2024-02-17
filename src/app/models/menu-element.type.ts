export class MenuElement {
    name: string = "";
    menuTxt: string = "";
    menuDescription: string = "";
    redirectPath: string = "";

    public deserialize(input: any): MenuElement {
        this.name = input.name;
        this.menuTxt = input.menuTxt;
        this.menuDescription = input.menuDescription;
        this.redirectPath = input.redirectPath;

        return this;
    }
}