/* ============================================================
   SECTIONS — os atos da experiência
   ============================================================ */
/* — Arcanos Maiores (baralho tradicional) — */
const MAJORS = [
  {r:'0',     nm:'O Louco',          g:'star',    m:'Recomeço, fé e a coragem de saltar ao desconhecido.',
    e:'Um recomeço e um salto de fé. Sua postura é de querer arriscar, seguir livre e testar um novo caminho, deixando para trás estruturas antigas. Pede coragem e confiança, mesmo sem todas as garantias.'},
  {r:'I',     nm:'O Mago',           g:'crystal', m:'Vontade e poder de manifestar o que se deseja.',
    e:'Poder de realização e iniciativa. Você tem em mãos os recursos e o talento para manifestar o que deseja — é hora de agir com foco, intenção e confiança nas próprias capacidades.'},
  {r:'II',    nm:'A Sacerdotisa',    g:'moon',    m:'Intuição e mistério; o saber que dispensa palavras.',
    e:'Intuição, silêncio e mistério. O desfecho pede observação mais do que ação: nem tudo será revelado de imediato, e a resposta vem pela percepção interna, não pelo impulso.'},
  {r:'III',   nm:'A Imperatriz',     g:'lotus',   m:'Abundância, fertilidade e acolhimento generoso.',
    e:'Fertilidade, cuidado e expansão. Ao redor há crescimento, criatividade, acolhimento e abundância — algo que começa a florescer, muitas vezes com apoio afetivo ou feminino.'},
  {r:'IV',    nm:'O Imperador',      g:'sun',     m:'Estrutura, autoridade e ordem que sustenta.',
    e:'Estrutura, autoridade e controle. Há uma necessidade forte de colocar ordem, definir limites e buscar segurança e estabilidade. O momento pede maturidade, planejamento e decisão racional.'},
  {r:'V',     nm:'O Hierofante',     g:'heart',   m:'Tradição, fé e a sabedoria dos que vieram antes.',
    e:'Tradição, fé e o caminho “correto”. Existe desejo de aprovação, estabilidade e pertencimento — mas também medo de julgamento, de regras ou de um compromisso formal.'},
  {r:'VI',    nm:'Os Enamorados',    g:'heart',   m:'União, escolha e a harmonia entre opostos.',
    e:'Uma escolha importante e a união de opostos. O conflito está em decidir — pode envolver relacionamento, parceria ou desejo. O desafio é escolher com consciência, e não por impulso.'},
  {r:'VII',   nm:'O Carro',          g:'sun',     m:'Vitória conquistada pela vontade e pelo rumo certo.',
    e:'Vitória pela vontade e pela direção. Avance com determinação e autocontrole, conduzindo forças opostas rumo a um objetivo claro. O sucesso vem de manter o rumo com disciplina.'},
  {r:'VIII',  nm:'A Força',          g:'heart',   m:'Coragem serena; o domínio gentil de si mesmo.',
    e:'Coragem serena e domínio interior. A solução vem da paciência e da firmeza gentil, não da imposição bruta. É a força que doma o medo e o impulso pela calma.'},
  {r:'IX',    nm:'O Eremita',        g:'moon',    m:'Recolhimento e a luz interior que ilumina o passo.',
    e:'Recolhimento e busca interior. Um tempo de reflexão, silêncio e introspecção; a luz que orienta vem de dentro, longe do barulho e das opiniões externas.'},
  {r:'X',     nm:'A Roda da Fortuna',g:'crystal', m:'Ciclos, destino e a virada inevitável das estações.',
    e:'Ciclos, virada e destino. Existe expectativa de mudança, sorte ou oportunidade, uma transformação que se aproxima. Mas a Roda lembra: nem tudo está sob o seu controle.'},
  {r:'XI',    nm:'A Justiça',        g:'star',    m:'Equilíbrio, verdade e a clareza de causa e efeito.',
    e:'Equilíbrio, verdade e consequência. Há acerto de contas, cobrança, contrato ou decisão que pede honestidade. Colhe-se o que foi semeado — algo precisa ser equilibrado.'},
  {r:'XII',   nm:'O Enforcado',      g:'lotus',   m:'Entrega, pausa e uma nova perspectiva sobre tudo.',
    e:'Pausa, entrega e nova perspectiva. É preciso parar, ceder e olhar de outro ângulo. O avanço vem de uma rendição consciente, não da pressa por resolver.'},
  {r:'XIII',  nm:'A Morte',          g:'crystal', m:'Fim que liberta; a transformação que faz renascer.',
    e:'Fim necessário e transformação. Algo se encerra para abrir espaço ao novo. Deixe ir o que já cumpriu seu ciclo — é uma passagem, não uma perda definitiva.'},
  {r:'XIV',   nm:'A Temperança',     g:'lotus',   m:'Cura, paciência e a justa medida das coisas.',
    e:'Cura, paciência e justa medida. Harmonize os extremos e busque o equilíbrio. A serenidade reconstrói aos poucos, misturando com cuidado o que parecia incompatível.'},
  {r:'XV',    nm:'O Diabo',          g:'crystal', m:'Apego, sombra e as correntes que nós mesmos forjamos.',
    e:'Apego, dependência e tentação. Algo prende mais do que deveria — uma obsessão, vínculo, ambição ou padrão repetitivo. Reconhecer essa corrente já é o primeiro passo para se libertar.'},
  {r:'XVI',   nm:'A Torre',          g:'sun',     m:'Ruptura súbita que derruba o falso para revelar.',
    e:'Ruptura súbita e revelação. Uma estrutura falsa desaba para que a verdade apareça. É abalo e susto, mas também libertação daquilo que já não se sustentava.'},
  {r:'XVII',  nm:'A Estrela',        g:'star',    m:'Esperança, fé renovada e inspiração que guia.',
    e:'Cura, esperança e clareza. Depois da tensão, vem uma fase mais leve, com inspiração, confiança e possibilidade de reconstrução. A fé se renova e o caminho se ilumina.'},
  {r:'XVIII', nm:'A Lua',            g:'moon',    m:'Sonhos, ilusões e a maré secreta do inconsciente.',
    e:'Sonhos, ilusões e o inconsciente. Nem tudo é o que parece; há névoa, medos antigos e incertezas. Caminhe pela intuição e tenha cuidado com enganos e autossabotagem.'},
  {r:'XIX',   nm:'O Sol',            g:'sun',     m:'Alegria, clareza e a vitalidade que tudo revela.',
    e:'Alegria, clareza e vitalidade. Sucesso, calor e verdade que tudo ilumina. Uma fase de realização, confiança e autenticidade, em que as coisas finalmente se revelam.'},
  {r:'XX',    nm:'O Julgamento',     g:'star',    m:'Despertar, chamado e a renovação que reergue.',
    e:'Despertar e renovação. Um chamado para se reerguer, perdoar e recomeçar com consciência. Algo do passado se resolve e abre uma nova etapa, mais lúcida.'},
  {r:'XXI',   nm:'O Mundo',          g:'lotus',   m:'Plenitude, realização e o retorno à totalidade.',
    e:'Plenitude e realização. Um ciclo se completa com integração e conquista. Há sensação de inteireza, missão cumprida e a abertura para um novo começo em outro nível.'},
];

/* — Cruz Celta: 10 posições (x,y em % do tabuleiro; rot graus) — */
const SPREAD = [
  {n:'1', x:35, y:50, rot:0,  t:'O Presente',          d:'O coração da questão — o agora que pulsa.'},
  {n:'2', x:35, y:50, rot:90, t:'O Desafio',           d:'Aquilo que cruza o seu caminho.'},
  {n:'3', x:35, y:81, rot:0,  t:'A Base',              d:'A raiz, o fundamento de tudo isso.'},
  {n:'4', x:14, y:50, rot:0,  t:'O Passado',           d:'O que se afasta, já vivido.'},
  {n:'5', x:35, y:19, rot:0,  t:'A Coroa',             d:'O possível; o que paira como potência.'},
  {n:'6', x:57, y:50, rot:0,  t:'O Futuro',            d:'O próximo passo que se aproxima.'},
  {n:'7', x:80, y:86, rot:0,  t:'Você',                d:'Sua atitude diante da questão.'},
  {n:'8', x:80, y:62, rot:0,  t:'O Ambiente',          d:'Influências e pessoas ao seu redor.'},
  {n:'9', x:80, y:38, rot:0,  t:'Esperanças e Medos',  d:'O que te move por dentro, no escuro.'},
  {n:'10',x:80, y:14, rot:0,  t:'O Resultado',         d:'O desfecho que se desenha.'},
];

function shuffleDeck(a){ const x=a.slice(); for(let i=x.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const t=x[i]; x[i]=x[j]; x[j]=t; } return x; }

/* ============================================================
   LEITURA SENSÍVEL À POSIÇÃO
   Cada carta tem um TEMA (th, encaixa em "…está {th}…") e um
   CONSELHO (adv). Cada casa da cruz tem um ENQUADRAMENTO que
   recebe o tema. interpret(carta, casa) = enquadramento + conselho.
   ============================================================ */
const CARD_TONE = {
  'O Louco':           {th:'um recomeço corajoso e a vontade de saltar ao desconhecido', adv:'Confie no impulso, mas dê o salto de olhos abertos.'},
  'O Mago':            {th:'o poder de realizar e a iniciativa de manifestar o que se deseja', adv:'Você tem os recursos: aja com foco e intenção.'},
  'A Sacerdotisa':     {th:'uma intuição silenciosa e um mistério que ainda não se revela', adv:'Observe mais do que age; a resposta vem por dentro.'},
  'A Imperatriz':      {th:'fertilidade, cuidado e algo que começa a florescer', adv:'Nutra a situação e deixe-a amadurecer no tempo dela.'},
  'O Imperador':       {th:'a necessidade de ordem, estrutura e controle', adv:'Estabeleça limites claros e decida com firmeza.'},
  'O Hierofante':      {th:'a busca por tradição, aprovação e um caminho seguro', adv:'Busque orientação sólida, sem se prender ao medo do julgamento.'},
  'Os Enamorados':     {th:'uma escolha importante e a tensão entre dois caminhos', adv:'Escolha com consciência, alinhando coração e valores.'},
  'O Carro':           {th:'a vontade firme e a determinação de manter o rumo', adv:'Conduza com disciplina e autocontrole rumo ao objetivo.'},
  'A Força':           {th:'a coragem serena que doma o medo pela calma', adv:'Vença pela paciência e pela firmeza gentil, não pela imposição.'},
  'O Eremita':         {th:'o recolhimento e a busca por uma luz interior', adv:'Recolha-se um tempo; a sua luz interna basta para guiar.'},
  'A Roda da Fortuna': {th:'um ciclo que vira e uma mudança que foge ao seu controle', adv:'Acompanhe a virada com flexibilidade — nem tudo se controla.'},
  'A Justiça':         {th:'um acerto de contas e a verdade que pede equilíbrio', adv:'Seja honesto e equilibre as contas; colhe-se o que se semeia.'},
  'O Enforcado':       {th:'uma pausa necessária e a entrega a um novo ângulo', adv:'Pare, ceda e olhe de outra perspectiva antes de agir.'},
  'A Morte':           {th:'um fim que liberta e uma transformação inevitável', adv:'Deixe ir o que já cumpriu seu ciclo para o novo nascer.'},
  'A Temperança':      {th:'a busca por equilíbrio, cura e a justa medida', adv:'Procure o meio-termo e reconstrua com paciência.'},
  'O Diabo':           {th:'um apego ou dependência que prende mais do que deveria', adv:'Reconheça a corrente que te prende — esse é o início da liberdade.'},
  'A Torre':           {th:'uma ruptura súbita que derruba o que era falso', adv:'Deixe ruir o que não se sustentava; sobre a verdade se reconstrói.'},
  'A Estrela':         {th:'a esperança renovada e uma cura que ilumina o caminho', adv:'Renove a fé e siga a inspiração que aponta a direção.'},
  'A Lua':             {th:'ilusões, medos antigos e uma névoa que confunde', adv:'Caminhe pela intuição e cuidado com enganos e autossabotagem.'},
  'O Sol':             {th:'alegria, clareza e a vitalidade que tudo revela', adv:'Mostre-se com autenticidade; é hora de brilhar.'},
  'O Julgamento':      {th:'um despertar e o chamado para recomeçar com consciência', adv:'Perdoe, reerga-se e recomece com mais lucidez.'},
  'O Mundo':           {th:'a plenitude de um ciclo que enfim se completa', adv:'Celebre a etapa cumprida e abra-se ao novo nível.'},
};

const POS_FRAME = [
  th => `No coração da questão pulsa ${th}. É disto que o seu agora é feito — o tema central que ocupa o presente.`,
  th => `Atravessando o seu caminho está ${th}. Este é o desafio (ou a força) com que você precisa lidar de frente.`,
  th => `Na raiz de tudo repousa ${th}. É o fundamento silencioso que sustenta a situação por baixo, muitas vezes sem que se perceba.`,
  th => `Já se afastando, ${th} marca o que ficou para trás — a vivência recente de onde você veio e que ainda ecoa.`,
  th => `Pairando como possibilidade, ${th} é o melhor que pode se realizar daqui: a meta, o ideal ou o resultado a que se pode aspirar.`,
  th => `Aproximando-se no horizonte imediato, ${th} é o próximo passo que se desenha — o que tende a entrar em cena em breve.`,
  th => `A sua postura diante de tudo é ${th}. É assim que, no fundo, você se coloca perante a questão.`,
  th => `Ao seu redor circula ${th}: as influências, as pessoas e o clima externo que cercam o tema.`,
  th => `No escuro, ${th} é o que te move por dentro — ao mesmo tempo aquilo que você anseia e o que secretamente teme.`,
  th => `Como desfecho, a cruz aponta para ${th}. É a direção provável se o caminho atual se mantiver.`,
];

function interpret(card, posIndex){
  const tone = CARD_TONE[card.nm];
  if(!tone) return card.e;
  return POS_FRAME[posIndex](tone.th) + ' ' + tone.adv;
}

/* ---------- I. HERO ---------- */
function Hero(){
  const smokeRef = useRef(null);
  useEffect(()=>{
    if(!smokeRef.current || !window.initSmoke) return;
    const ctrl = window.initSmoke(smokeRef.current, { scale: 0.55, fps: 30 });
    return ()=>{ if(ctrl && ctrl.destroy) ctrl.destroy(); };
  },[]);
  const glyphs = [
    {n:'star',    cls:'g1'},
    {n:'moon',    cls:'g2'},
    {n:'lotus',   cls:'g3'},
    {n:'sun',     cls:'g4'},
    {n:'crystal', cls:'g5'},
    {n:'heart',   cls:'g6'},
  ];
  return React.createElement('section',{id:'abertura','data-screen-label':'I · Abertura', className:'act hero'},
    React.createElement('div',{className:'sky'}),
    React.createElement('div',{className:'hero-far','data-par':'-12'}),
    React.createElement('div',{className:'hero-mandala','data-par':'30'}),
    React.createElement('canvas',{className:'hero-smoke', ref:smokeRef, 'aria-hidden':'true'}),
    React.createElement('div',{className:'hero-glyphs'},
      glyphs.map((g,i)=>React.createElement('div',{key:g.n, className:'glyph '+g.cls, 'data-par': String(16+i*7)},
        React.createElement('img',{src:'assets/glyph-'+g.n+'.png', alt:''})
      ))
    ),
    React.createElement('div',{className:'hero-moon','data-par':'40'}),
    React.createElement('div',{className:'hero-near','data-par':'-52'}),
    React.createElement('div',{className:'hero-near b','data-par':'-72'}),
    React.createElement('div',{className:'hero-inner'},
      React.createElement('span',{className:'kicker rv'},'Tarologia · Leitura das almas'),
      React.createElement('h1',null,
        React.createElement('span',{className:'a rv d1'},'Véu'),
        React.createElement('span',{className:'b rv d2'},'Escarlate')
      ),
      React.createElement('p',{className:'sub rv d3'},'Onde as cartas sussurram aquilo que o tempo ainda esconde.')
    ),
    React.createElement('div',{className:'scroll-cue'},
      React.createElement('span',null,'Desça ao véu'),
      React.createElement('span',{className:'ln'})
    )
  );
}

/* ---------- II. INVOCAÇÃO ---------- */
function Invocation(){
  const ref = useReveal();
  const line = 'Antes de cada carta há um silêncio. Respire — aquilo que você procura também procura por você.';
  const words = line.split(' ');
  return React.createElement('section',{id:'invocacao','data-screen-label':'II · Invocação', className:'act invocation', ref},
    React.createElement('div',{className:'bg-layer','data-par':'-30'}),
    React.createElement('div',{className:'act-pad'},
      React.createElement('span',{className:'mark rv'},'❝'),
      React.createElement('p',{className:'quote'},
        words.flatMap((w,i)=>{
          const g = ['silêncio.','procura','você.'].includes(w);
          return [
            React.createElement('span',{key:'w'+i, className:'word rv', style:{transitionDelay:(0.05*i)+'s'}},
              React.createElement('span',{className:g?'g':''}, w)),
            ' '
          ];
        })
      )
    )
  );
}

/* ---------- III. A VIDENTE — palco de vídeo ---------- */
function Seer(){
  const vidRef = useRef(null);
  const [playing,setPlaying] = useState(false);
  const start = ()=>{ const v=vidRef.current; if(!v) return; v.play().then(()=>setPlaying(true)).catch(()=>{}); };
  return React.createElement('section',{id:'vidente','data-screen-label':'III · A Vidente', className:'act seervid'},
    React.createElement('div',{className:'vstage rv'},
      React.createElement('div',{className:'vframe'+(playing?' playing':'')},
        React.createElement('span',{className:'corner tl'}),
        React.createElement('span',{className:'corner tr'}),
        React.createElement('span',{className:'corner bl'}),
        React.createElement('span',{className:'corner br'}),
        React.createElement('video',{
          ref:vidRef, className:'vplayer', controls:playing, playsInline:true, preload:'none', src:'assets/tarologa.mp4'
        }),
        !playing && React.createElement('button',{className:'vph', onClick:start},
          React.createElement('div',{className:'vph-glow'}),
          React.createElement('div',{className:'play'}),
          React.createElement('b',null,'Vídeo da Taróloga'),
          React.createElement('span',null,'Coloque o arquivo em  assets/tarologa.mp4')
        )
      )
    )
  );
}

/* ---------- IV. A TIRAGEM — Cruz Celta funcional ---------- */
function ReadCard({card, pos, idx, up, focus, onPick}){
  const h = React.createElement;
  return h('button',{
      className:'tk'+(up?' up':'')+(focus?' focus':''),
      style:{left:pos.x+'%', top:pos.y+'%', '--rot':(pos.rot||0)+'deg', transitionDelay:(idx*0.06)+'s'},
      onClick:()=>onPick(idx), 'aria-label':'Posição '+pos.n},
    h('span',{className:'tk-badge'}, pos.n),
    h('div',{className:'tk-flip'},
      h('div',{className:'tk-back'}, h('span',{className:'tk-seal'})),
      h('div',{className:'tk-face'},
        h('span',{className:'tk-roman'}, card.r),
        h('span',{className:'tk-glyph', style:{backgroundImage:'url(assets/glyph-'+card.g+'.png)'}}),
        h('span',{className:'tk-nm'}, card.nm)
      )
    )
  );
}

/* taróloga — guia em áudio (player) */
function AudioGuide({src, label}){
  const h = React.createElement;
  const ref = useRef(null);
  const [on,setOn]   = useState(false);
  const [t,setT]     = useState(0);
  const [dur,setDur] = useState(0);
  const [err,setErr] = useState(false);
  useEffect(()=>{
    const a=ref.current; if(!a) return;
    const u=()=>setT(a.currentTime||0), m=()=>setDur(a.duration||0);
    const pl=()=>setOn(true), pa=()=>setOn(false);
    a.addEventListener('timeupdate',u); a.addEventListener('loadedmetadata',m);
    a.addEventListener('play',pl); a.addEventListener('pause',pa); a.addEventListener('ended',pa);
    return ()=>{ a.removeEventListener('timeupdate',u); a.removeEventListener('loadedmetadata',m);
      a.removeEventListener('play',pl); a.removeEventListener('pause',pa); a.removeEventListener('ended',pa); };
  },[]);
  const toggle=()=>{ const a=ref.current; if(!a) return; if(a.paused){ a.play().catch(()=>setErr(true)); } else { a.pause(); } };
  const seek=(e)=>{ const a=ref.current; if(!a||!dur) return; const r=e.currentTarget.getBoundingClientRect(); a.currentTime=Math.max(0,Math.min(dur,((e.clientX-r.left)/r.width)*dur)); };
  const fmt=s=>{ if(!isFinite(s)||s<0) return '0:00'; const m=Math.floor(s/60), ss=Math.floor(s%60); return m+':'+(ss<10?'0':'')+ss; };
  const pct = dur ? Math.min(100, t/dur*100) : 0;
  return h('div',{className:'audioguide'+(on?' playing':'')},
    h('audio',{ref, src, preload:'none'}),
    h('button',{className:'ag-btn', onClick:toggle, 'aria-label':on?'Pausar narração':'Ouvir narração'},
      h('span',{className:'ag-ico '+(on?'pause':'play')})),
    h('div',{className:'ag-main'},
      h('div',{className:'ag-label'}, label),
      h('div',{className:'ag-bar', onClick:seek}, h('i',{style:{width:pct+'%'}})),
      h('div',{className:'ag-sub'}, err ? ('Adicione  '+src) : (dur ? (fmt(t)+' / '+fmt(dur)) : 'Toque ▸ para a taróloga guiar a leitura'))
    )
  );
}

/* compõe a leitura corrida da cruz a partir das cartas tiradas */
function composeReading(d){
  const n = i => d[i].nm;
  const m = i => d[i].m;
  return [
    `No centro da sua cruz repousa ${n(0)}, e sobre ela se deita ${n(1)} como aquilo que cruza o caminho. ${m(0)}`,
    `Esse instante nasce de uma raiz — ${n(2)} — e do que já se afasta, ${n(3)}. Acima paira ${n(4)}, o que ainda pode ser; à frente, ${n(5)} se aproxima como próximo passo.`,
    `Dentro de você arde ${n(8)}, enquanto a sua postura diante de tudo é ${n(6)}; ao redor, ${n(7)} molda o ambiente e as pessoas.`,
    `A cruz inteira aponta para ${n(9)} como desfecho — ${m(9)}`
  ];
}

function Arcana(){
  const h = React.createElement;
  const [seed,setSeed]     = useState(0);
  const [dealt,setDealt]   = useState(false);
  const [up,setUp]         = useState(()=>Array(10).fill(false));
  const [focus,setFocus]   = useState(-1);
  const [reading,setReading] = useState(false);
  const draw = React.useMemo(()=> shuffleDeck(MAJORS).slice(0,10), [seed]);
  const story = React.useMemo(()=> composeReading(draw), [draw]);

  const deal = ()=> setDealt(true);
  const pick = (i)=>{ if(!dealt) return; setUp(a=>{ const n=a.slice(); n[i]=true; return n; }); setFocus(i); };
  const revealAll = ()=>{ setUp(Array(10).fill(true)); };
  const reset = ()=>{ setSeed(s=>s+1); setDealt(false); setUp(Array(10).fill(false)); setFocus(-1); setReading(false); };

  const revealedCount = up.filter(Boolean).length;
  const allUp = revealedCount===10;
  const fc = focus>=0;

  return h('section',{id:'arcanos','data-screen-label':'IV · A Tiragem', className:'act reading'},
    h('div',{className:'bg-layer','data-par':'-22'}),
    h('div',{className:'reading-grid'},

      /* — tabuleiro — */
      h('div',{className:'board-wrap rv'},
        h('div',{className:'board'+(dealt?' dealt':'')},
          draw.map((c,i)=> h(ReadCard,{key:i, card:c, pos:SPREAD[i], idx:i, up:up[i], focus:focus===i, onPick:pick})),
          !dealt && h('div',{className:'board-veil'},
            h('div',{className:'deck-stack'}, h('i'),h('i'),h('i'),h('i')),
            h('button',{className:'cta deal', onClick:deal},'Embaralhar & tirar ✦')
          )
        )
      ),

      /* — painel de leitura — */
      h('div',{className:'panel rv d2'},
        h('span',{className:'act-num'},'Ato IV'),
        h('h2',{className:'title'},'A ',h('em',null,'Cruz Celta')),
        h(AudioGuide,{src:'assets/leitura-tarologa.mp3', label:'A voz da taróloga'}),
        h('div',{className:'panel-body'},
          !dealt && h('p',{className:'panel-hint'},'O baralho dos 22 Arcanos Maiores aguarda. Concentre a sua pergunta e revele a tiragem.'),

          dealt && reading && h('div',{className:'reading-full'},
            story.map((p,i)=> h('p',{key:'s'+i, className:'rf-para'}, p)),
            h('div',{className:'rc-rule'}),
            h('ul',{className:'rf-list'},
              SPREAD.map((p,i)=> h('li',{key:i},
                h('span',{className:'rf-pos'}, p.n+' · '+p.t),
                h('span',{className:'rf-card'}, draw[i].r+' · '+draw[i].nm),
                h('span',{className:'rf-mean'}, interpret(draw[i], i))
              ))
            )
          ),

          dealt && !reading && !fc && h('p',{className:'panel-hint'},'As dez lâminas estão postas. Toque cada carta para virá-la — ou revele todas e leia a cruz inteira.'),

          dealt && !reading && fc && h('div',{className:'reveal-card'},
            h('div',{className:'rc-pos'}, h('b',null,SPREAD[focus].n),' · ',SPREAD[focus].t),
            h('div',{className:'rc-posdesc'}, SPREAD[focus].d),
            up[focus] && h(React.Fragment,null,
              h('div',{className:'rc-rule'}),
              h('div',{className:'rc-card'},
                h('span',{className:'rc-roman'}, draw[focus].r),
                h('span',{className:'rc-name'}, draw[focus].nm)
              ),
              h('p',{className:'rc-mean'}, interpret(draw[focus], focus))
            )
          )
        ),
        dealt && h('div',{className:'panel-foot'},
          h('div',{className:'prog'}, h('i',{style:{width:(revealedCount*10)+'%'}})),
          h('div',{className:'panel-actions'},
            reading
              ? h('button',{className:'ghost-btn', onClick:()=>setReading(false)},'Voltar às cartas')
              : (allUp
                  ? h('button',{className:'cta mini', onClick:()=>setReading(true)},'Ler a tiragem ✦')
                  : h('button',{className:'ghost-btn', onClick:revealAll},'Revelar todas')),
            h('button',{className:'ghost-btn', onClick:reset},'Nova leitura')
          )
        )
      )
    )
  );
}

/* ---------- V. CONSULTA — chamada para leitura online ---------- */
function Consult(){
  const h = React.createElement;
  const ref = useReveal();
  return h('section',{id:'consulta','data-screen-label':'V · Consulta', className:'act consult', ref},
    h('div',{className:'consult-sky'}),
    h('div',{className:'hero-moon consult-moon','data-par':'40'}),
    h('div',{className:'hero-near b consult-mist','data-par':'-60'}),
    h('div',{className:'consult-inner'},
      h('span',{className:'kicker rv', style:{justifyContent:'center', display:'inline-flex'}},'Consulta online'),
      h('h2',{className:'consult-title rv d1'},'Uma leitura com a ',h('em',null,'Taróloga Aquila')),
      h('p',{className:'consult-sub rv d2'},'Sua pergunta merece a resposta das cartas. Marque a sua consulta ao vivo, de onde estiver.'),
      h('a',{className:'cta rv d3', href:'https://wa.me/5500000000000', target:'_blank', rel:'noopener'},'Agendar consulta ✦'),
      h('div',{className:'footer-line rv d4'},'Véu Escarlate ',h('span',{className:'dot'},'·'),' Taróloga Aquila ',h('span',{className:'dot'},'·'),' MMXXVI')
    )
  );
}

Object.assign(window,{ Hero, Invocation, Seer, Arcana, Consult });
