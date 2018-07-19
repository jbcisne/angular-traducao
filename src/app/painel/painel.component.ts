import { Component, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public instrucao: string = "Traduza a frase:"
  public frases: Frase[] = FRASES
  public resposta: string = ''
  public rodada: number = 0
  public rodadaFrase: Frase
  public progresso: number = 0
  public tentativas: number = 3

  //exposição do atributo encerrarJogo para o componente pai app.ts
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() { 
    this.atualizaRodada()
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificaResposta(): void {
    if (this.rodadaFrase.frasePtBr == this.resposta.trim()) {
      this.progresso = this.progresso + (100 / this.frases.length)
      this.rodada++

      if (this.rodada === this.frases.length) {
        //alert('Traduções concluídas com sucesso.')
        this.encerrarJogo.emit('vitoria')
      }

      this.atualizaRodada()
      
    } else {
      this.tentativas--
      if(this.tentativas === -1){
        //alert('Você perdeu todas as tentativas')
        this.encerrarJogo.emit('derrota')
      }
    }
    
  }

  private atualizaRodada():void {
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''
  }

}
