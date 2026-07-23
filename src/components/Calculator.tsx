import { useState } from "react";

type Resultado = {
  custoTotal: number;
  precoVenda: number;
  lucroLiquido: number;
  roi: number;
  margemReal: number;
  status: string;
};

function Calculator() {
  const [produto, setProduto] = useState("");
  const [frete, setFrete] = useState("");
  const [cotacao, setCotacao] = useState("5.40");
  const [margem, setMargem] = useState("50");
  const [taxaPlataforma, setTaxaPlataforma] = useState("0");
  const [taxaPagamento, setTaxaPagamento] = useState("0");
  const [resultado, setResultado] = useState<Resultado | null>(null);

  function calcularLucro() {
    const custoProduto = Number(produto);
    const custoFrete = Number(frete);
    const valorCotacao = Number(cotacao);
    const margemDesejada = Number(margem);
    const plataforma = Number(taxaPlataforma);
    const pagamento = Number(taxaPagamento);
    const taxasTotais = plataforma + pagamento;

    if (
      custoProduto < 0 ||
      custoFrete < 0 ||
      valorCotacao <= 0 ||
      margemDesejada < 0 ||
      margemDesejada >= 100 ||
      plataforma < 0 ||
      pagamento < 0
    ) {
      alert("Revise os valores informados.");
      return;
    }

    const percentualTotal = (margemDesejada + taxasTotais) / 100;

    if (percentualTotal >= 1) {
      alert("A soma da margem e das taxas precisa ser menor que 100%.");
      return;
    }

    const custoTotal = (custoProduto + custoFrete) * valorCotacao;
    const precoVenda = custoTotal / (1 - percentualTotal);
    const valorTaxas = precoVenda * (taxasTotais / 100);
    const lucroLiquido = precoVenda - custoTotal - valorTaxas;
    const roi = custoTotal > 0 ? (lucroLiquido / custoTotal) * 100 : 0;
    const margemReal =
      precoVenda > 0 ? (lucroLiquido / precoVenda) * 100 : 0;

    let status = "Não recomendado";

    if (margemReal >= 45) {
      status = "Excelente";
    } else if (margemReal >= 30) {
      status = "Boa";
    } else if (margemReal >= 15) {
      status = "Atenção";
    }

    setResultado({
      custoTotal,
      precoVenda,
      lucroLiquido,
      roi,
      margemReal,
      status,
    });
  }

  return (
    <section className="calculator-card">
      <div className="calculator-heading">
        <span className="eyebrow">VELTRIX TECHNOLOGIES</span>
        <h1>Veltrix Profit Calculator</h1>
        <p>Precifique seus produtos com inteligência.</p>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="produto">Produto (USD)</label>
          <input
            id="produto"
            type="number"
            min="0"
            step="0.01"
            value={produto}
            onChange={(event) => setProduto(event.target.value)}
            placeholder="0.00"
          />
        </div>

        <div className="field">
          <label htmlFor="frete">Frete (USD)</label>
          <input
            id="frete"
            type="number"
            min="0"
            step="0.01"
            value={frete}
            onChange={(event) => setFrete(event.target.value)}
            placeholder="0.00"
          />
        </div>

        <div className="field">
          <label htmlFor="cotacao">Cotação (R$)</label>
          <input
            id="cotacao"
            type="number"
            min="0.01"
            step="0.01"
            value={cotacao}
            onChange={(event) => setCotacao(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="margem">Margem desejada (%)</label>
          <input
            id="margem"
            type="number"
            min="0"
            max="99.99"
            step="0.01"
            value={margem}
            onChange={(event) => setMargem(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="taxa-plataforma">Taxa da plataforma (%)</label>
          <input
            id="taxa-plataforma"
            type="number"
            min="0"
            step="0.01"
            value={taxaPlataforma}
            onChange={(event) => setTaxaPlataforma(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="taxa-pagamento">Taxa de pagamento (%)</label>
          <input
            id="taxa-pagamento"
            type="number"
            min="0"
            step="0.01"
            value={taxaPagamento}
            onChange={(event) => setTaxaPagamento(event.target.value)}
          />
        </div>
      </div>

      <button type="button" onClick={calcularLucro}>
        Calcular lucro
      </button>

      {resultado && (
        <div className="results">
          <div>
            <span>Custo total</span>
            <strong>R$ {resultado.custoTotal.toFixed(2)}</strong>
          </div>

          <div>
            <span>Preço sugerido</span>
            <strong>R$ {resultado.precoVenda.toFixed(2)}</strong>
          </div>

          <div>
            <span>Lucro líquido</span>
            <strong>R$ {resultado.lucroLiquido.toFixed(2)}</strong>
          </div>

          <div>
            <span>ROI</span>
            <strong>{resultado.roi.toFixed(1)}%</strong>
          </div>

          <div>
            <span>Margem real</span>
            <strong>{resultado.margemReal.toFixed(1)}%</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>{resultado.status}</strong>
          </div>
        </div>
      )}
    </section>
  );
}

export default Calculator;