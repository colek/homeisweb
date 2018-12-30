import { Component, OnInit } from '@angular/core';
import { Expression } from 'app/classes';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { CodemirrorComponent } from 'ng2-codemirror';
import 'codemirror/mode/lua/lua'
import { ExpressionService } from 'app/services/expression.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'expression',
  templateUrl: './expression.component.html',
  styleUrls: ['./expression.component.css'],
  providers: [Expression]
})
export class ExpressionComponent implements OnInit {
  expression: Expression;
  expressionLog: string;
  timer:any;
  timerSubscription:Subscription;
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

  constructor(private _expressionService: ExpressionService,
    private route: ActivatedRoute,
    private _location: Location) { }

  ngOnInit() {
    this.timer = Observable.timer(1000,1000);    
    this.timerSubscription = this.timer.subscribe(t => this.loadDebugLog(this.id));
    
    let parentId = this.route.snapshot.params['parentId'];
    this.id = this.route.snapshot.params['id'];
    this.loadNewExpression(null);

    if (this.id == undefined) {
      this.isNew = true;
      this.header = "Nový výraz";
      this.loadNewExpression(parentId);
    }
    else {
      this.readExpression(this.id);
    }    
  }

  loadDebugLog(expressionId: string) {
    this._expressionService.getExpressionLog(expressionId)
    .subscribe(
    data => {
      this.expressionLog = "";
      data.forEach(element => {
        this.expressionLog += element + "\n";
      });             
    });
  }


  readExpression(expressionId: string){
    this.isNew = false;
      this.header = "Editace výrazu";
      this.route.params
        .switchMap((params: Params) => this.loadExpression(expressionId))
        .subscribe(
        data => {          
          this.expression = data;
          this.setScriptRunning();
        },
        error => { },
        () => console.log('Completed!')
      );
  }

  loadNewExpression(parentId: string) {
    this.expression = new Expression();
    this.expression.parentId = (parentId != undefined && parentId != 'undefined') ? parentId : null;
    this.expression.running = false;
    this.expression.description = null;
    this.expression.expression = "";
    this.expression.errorMessage = null;
    this.expression.name = null;
    this.expression.id = null;
    this.expression.nodeName = "expression";
  }

  loadExpression(expressionId: string) {
    return this._expressionService.getExpression(expressionId);
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
      this._expressionService.addExpression(this.expression)
        .subscribe(
          data => this.strExpression = JSON.stringify(data),
          error => { },
          () => console.log('Completed!')
        );
    }
    else {
      this._expressionService.editExpression(this.expression)
        .subscribe(
          data => this.strExpression = JSON.stringify(data),
          error => { },
          () => console.log('Completed!')
        );
    }
  }



  onBack() {
    this._location.back();
  }

  onDelete() {
    this._expressionService.deleteExpression(this.id)
      .subscribe(
        data => this.strExpression = JSON.stringify(data),
        error => { },
        () => console.log('Delete clicked!')
      );
  }

  onTest() {
    return this._expressionService.testExpression(this.id).subscribe(
      data => {
        this.strExpression = JSON.stringify(data);        
        this.readExpression(this.expression.id);
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
