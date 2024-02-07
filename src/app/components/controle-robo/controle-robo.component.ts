import { CommonModule } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ControleRoboService } from '../../services/controle-robo.service';
import { MovimentoRoboService } from '../../services/movimento-robo.service';

@Component({
  selector: 'app-controle-robo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './controle-robo.component.html',
  styleUrls: ['./controle-robo.component.css'],
})
export class ControleRoboComponent implements OnInit {
  constructor(
    private _movimentoRoboService: MovimentoRoboService,
    private _controleRoboService: ControleRoboService
  ) {}

  roboEstadoAtual: any;
  robo = {
    idMovimentoCotoveloEsquerdo: null,
    idMovimentoCotoveloDireito: null,
    idMovimentoPulsoEsquerdo: null,
    idMovimentoPulsoDireito: null,
    idMovimentoRotacao: null,
    idMovimentoInclinacao: null,
  };

  movimentosCotovelo: any[] | undefined;
  movimentosPulso: any[] | undefined;
  movimentosRotacao: any[] | undefined;
  movimentosInclinacao: any[] | undefined;

  ngOnInit(): void {
    this.carregarMovimentosRobo();
    this.definirEstadoInicialRobo();
  }

  carregarMovimentosRobo(): void {
    this._movimentoRoboService.carregarMovimentosRobo().subscribe({
      next: (res) => this.atualizarSelectsComMovimentos(res),
      error: (error) => console.error(error),
    });
  }

  definirEstadoInicialRobo(): void {
    this._controleRoboService.obterEstadoInicialRobo().subscribe({
      next: (res) => {
        this.robo = {
          idMovimentoCotoveloEsquerdo: res.idMovimentoCotoveloEsquerdo,
          idMovimentoCotoveloDireito: res.idMovimentoCotoveloDireito,
          idMovimentoPulsoEsquerdo: res.idMovimentoPulsoEsquerdo,
          idMovimentoPulsoDireito: res.idMovimentoPulsoDireito,
          idMovimentoRotacao: res.idMovimentoRotacao,
          idMovimentoInclinacao: res.idMovimentoInclinacao,
        };

        this.roboEstadoAtual = {...this.robo};
      },
      error: (e) => console.error(e),
    });
  }

  atualizarSelectsComMovimentos(dados: any): void {
    this.movimentosCotovelo = dados.movimentosCotovelo;
    this.movimentosPulso = dados.movimentosPulso;
    this.movimentosRotacao = dados.movimentosRotacao;
    this.movimentosInclinacao = dados.movimentosInclinacao;
  }

  movimentarRobo(tipoMovimento: any) {
    console.log('chamei!');

    const controlaRobo = {
      estadoAtual: this.roboEstadoAtual,
      estadoNovo: this.formatarObjetoRobo(this.robo),
      tipoMovimento: tipoMovimento,
    };

    this._controleRoboService.acionarRobo(controlaRobo).subscribe({
      next: (res) => {
        this.roboEstadoAtual = res;
        this.robo = {...this.roboEstadoAtual};
        Swal.fire('Sucesso!', 'Movimento realizado com sucesso', 'success');
      },
      error: (error) => {
        this.robo = {...this.roboEstadoAtual};
        Swal.fire('Ops!', error, 'error');
      },
    });
  }

  formatarObjetoRobo(robo: any) {
    const formatado = {
      idMovimentoCotoveloEsquerdo: Number(robo.idMovimentoCotoveloEsquerdo),
      idMovimentoCotoveloDireito: Number(robo.idMovimentoCotoveloDireito),
      idMovimentoPulsoEsquerdo: Number(robo.idMovimentoPulsoEsquerdo),
      idMovimentoPulsoDireito: Number(robo.idMovimentoPulsoDireito),
      idMovimentoRotacao: Number(robo.idMovimentoRotacao),
      idMovimentoInclinacao: Number(robo.idMovimentoInclinacao),
    };

    return formatado;
  }
}
