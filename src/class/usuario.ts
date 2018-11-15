export class Match {
  public ID: number;
  public NAME: string;
  public USER: string;
  public PASSWORD: string;
  
  constructor() { }

  public getId() {
    return this.ID;
  }
  public setId(id) {
    this.ID = id;
  }
  public getName() {
    return this.NAME;
  }
  public setName(name) {
    this.NAME = name;
  }
  public getUser() {
    return this.USER;
  }
  public setUser(user) {
    this.USER = user;
  }
  public getPassword() {
    return this.PASSWORD;
  }
  public setPassword(password) {
    this.PASSWORD = password;
  }
}