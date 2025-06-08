<h1>Meu Projeto</h1>

<p>Este projeto é composto por <strong>backend</strong> e <strong>frontend</strong>.</p>

<ul>
  <li>O <strong>backend</strong> utiliza <code>Node.js</code>, <code>TypeORM</code> e <code>PostgreSQL</code>.</li>
  <li>O <strong>frontend</strong> é feito com <code>React</code> utilizando o framework <code>Next.js</code>.</li>
</ul>

<h2>📌 Pré-requisitos</h2>
<ul>
  <li><strong>PostgreSQL</strong> instalado e em funcionamento</li>
  <li><strong>Node.js</strong> e <strong>Yarn</strong> instalados</li>
</ul>

<h2>⚙️ Configuração</h2>

<ol>
  <li>
    Crie um arquivo <code>.env</code> na raiz do projeto com as seguintes variáveis de ambiente:
    <pre><code>DB_USERNAME='Nomedousuarionobanco'
DB_PASSWORD='Senhadobanco'
DB_PORT='PortaDoBancoGeralmente5432'
DB_HOST='HostDoBancoGeralmentelocalhost'
DB_NAME='NomeDoBanco'
JWT_KEY='UmaStringSuperSecretaQualquer'</code></pre>
  </li>
  <li>
    Instale as dependências do projeto:
    <pre><code>yarn</code></pre>
  </li>
  <li>
    Execute as migrations para configurar o banco de dados:
    <pre><code>yarn typeorm migration:run -- -d data-source.ts</code></pre>
  </li>
</ol>

<h2>🚀 Rodando o projeto</h2>

<h3>🔧 Backend (porta 3001)</h3>
<pre><code>yarn start:dev</code></pre>
<p>O backend ficará disponível em: <a href="http://localhost:3001" target="_blank">http://localhost:3001</a></p>

<h3>💻 Frontend (Next.js - porta 3000)</h3>
<pre><code>yarn dev</code></pre>
<p>O frontend ficará disponível em: <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>
