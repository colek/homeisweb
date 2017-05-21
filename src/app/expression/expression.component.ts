import { Component, OnInit } from '@angular/core';
import { Expression } from './../classes';
import { CommonService } from './../common.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { CodemirrorComponent } from 'ng2-codemirror';
import 'codemirror/mode/lua/lua'

@Component({
  selector: 'expression',
  templateUrl: './expression.component.html',
  styleUrls: ['./expression.component.css'],
  providers: [Expression, CommonService]
})
export class ExpressionComponent implements OnInit {
  expression: Expression;
  strExpression: string;
  header: string;
  isNew: boolean;
  id: string;
  expConfig = {
    lineNumbers: true,
    mode: "lua",
    extraKeys: { "Ctrl-Space": "autocomplete" }
  };
  isRunningText: string;
  btnRunningClass: string;

  constructor(private _commonService: CommonService,
    private route: ActivatedRoute,
    private _location: Location) { }

  ngOnInit() {
    let parentId = this.route.snapshot.params['parentId'];
    this.id = this.route.snapshot.params['id'];
    this.loadNewExpression(null);

    if (this.id == undefined) {
      this.isNew = true;
      this.header = "Nový výraz";
      this.loadNewExpression(parentId);
    }
    else {
      this.readExpression(parentId);
    }    
  }

  readExpression(parentId: string){
    this.isNew = false;
      this.header = "Editace výrazu";
      this.route.params
        .switchMap((params: Params) => this.loadExpression(parentId))
        .subscribe(
        data => {
          this.setExpr(data);
          this.setScriptRunning();
        },
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
        );
  }

  loadNewExpression(parentId: string) {
    this.expression = new Expression();
    this.expression.parentId = (parentId != undefined && parentId != 'undefined') ? parentId : null;
    this.expression.running = false;
    this.expression.description = null;
    this.expression.expression = "";
    this.expression.errormessage = null;
    this.expression.name = null;
    this.expression.id = null;
    this.expression.NodeName = "expression";
  }

  loadExpression(id: string) {
    return this._commonService.getExpressions(id);
  }

  setExpr(expr: Expression[]) {
    for (let ex of expr) {
      if (ex.id == this.id) {
        this.expression = ex;
        this.strExpression = JSON.stringify(expr);
        return;
      }
    }

  }

  onSave() {
    if (this.isNew) {
      this._commonService.addExpression(this.expression)
        .subscribe(
        data => this.strExpression = JSON.stringify(data),
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
        );
    }
    else {
      this._commonService.editExpression(this.expression)
        .subscribe(
        data => this.strExpression = JSON.stringify(data),
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
        );
    }
  }



  onBack() {
    this._location.back();
  }

  onDelete() {
    this._commonService.deleteExpression(this.id)
      .subscribe(
      data => this.strExpression = JSON.stringify(data),
      error => console.error('Error: ' + error),
      () => console.log('Delete clicked!')
      );
  }

  onTest() {
    return this._commonService.testExpression(this.id).subscribe(
      data => {
        this.strExpression = JSON.stringify(data);
        this.readExpression(this.expression.parentId);
      },
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
    );

    
  }

  switchOnOff() {
    this.expression.running = !this.expression.running;
    this.setScriptRunning();
  }

  setScriptRunning() {
    this.isRunningText = (this.expression.running) ? "Zapnuto" : "Vypnuto";
    this.btnRunningClass = (this.expression.running) ? "btn-success" : "btn-warning";
  }

}
