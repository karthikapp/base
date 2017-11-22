import { Injectable } from '@angular/core';
import { Accounts } from "../classes/accounts"

@Injectable()
export class DataServiceService {
  public account: Accounts[];

  constructor() { }

}
