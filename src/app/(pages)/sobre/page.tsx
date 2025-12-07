import "./style.css";

const SobrePage: React.FC = () => {
  return (
    <div className="max-w-[900px] my-0 mx-auto py-8 px-4">
      <h1 className="text-4xl text-[#333] mb-4">Sobre a AutoStore</h1>
      <p className="text-[#555] text-xl mb-6">
        Somos uma plataforma dedicada a conectar compradores e vendedores de
        veículos com transparência e segurança.
      </p>

      <section className="section">
        <h2>Nossa missão</h2>
        <p>
          Oferecer listagens claras, fotos de qualidade e informações confiáveis
          para que você encontre o veículo certo com confiança.
        </p>
      </section>

      <section className="section">
        <h2>O que oferecemos</h2>
        <ul>
          <li>
            Listagens detalhadas com histórico e características do veículo
          </li>
          <li>Fotos otimizadas para visualização em desktop e mobile</li>
          <li>Suporte ao cliente para dúvidas e negociações</li>
        </ul>
      </section>

      <section className="section">
        <h2>Contato</h2>
        <p>
          Para mais informações, acesse a página de contato ou envie uma
          mensagem através do formulário.
        </p>
      </section>
    </div>
  );
};

export default SobrePage;
