import { Component, OnInit } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public instrucao: string = "Traduza a frase:"
  public frases: Frase[] = FRASES
  public resposta: string
  public rodada: number = 0
  public rodadaFrase: Frase
  public progresso: number = 0

  constructor() { 
    this.atualizaRodada(this.rodada)
    console.log(this.rodadaFrase)
  }

  ngOnInit() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificaResposta(): void {
    console.log("Verificar resposta: ", this.resposta)
    if (this.rodadaFrase.frasePtBr == this.resposta.trim()) {
      alert('resposta correta. Parabéns')
      this.progresso = this.progresso + (100 / this.frases.length)
      this.atualizaRodada(++this.rodada)
    } else {
      alert('resposta errada')
    }
    
  }

  private atualizaRodada(rodada: number):void {
    this.rodadaFrase = this.frases[rodada];
  }

}
