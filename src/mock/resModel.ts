interface IResOutput {
  data: any;
  msg: string;
}

class BaseModel {
  resOutput: IResOutput;

  constructor(resOutput: IResOutput) {
    this.resOutput = resOutput;
  }
}

export class ExpireModel extends BaseModel {
  opeResult: string;
  tokenExpired: boolean;

  constructor(resOutput: IResOutput) {
    super(resOutput);
    this.opeResult = 'error';
    this.tokenExpired = true;
  }
}

export class SuccessModel extends BaseModel {
  opeResult: string;

  constructor(resOutput: IResOutput) {
    super(resOutput);
    this.opeResult = 'success';
  }
}

export class ErrorModel extends BaseModel {
  opeResult: string;

  constructor(resOutput: IResOutput) {
    super(resOutput);
    this.opeResult = 'error';
  }
}
