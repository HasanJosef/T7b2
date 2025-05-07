// vertausluku.js

/**
 * Laskee vertausluvut ehdokkaille D'Hondtin menetelmällä
 * @param {Object[]} ehdokkaat - Taulukko ehdokasobjekteja, joissa numero, nimi ja äänimäärä
 * @returns {Object[]} - Taulukko ehdokkaita, joilla on lisättynä vertausluvut ja mahdollisesti arvottu-kenttä
 */
export default function laskeVertausluvut(ehdokkaat) {
  // Ryhmitellään ehdokkaat äänten mukaan
  const ryhmat = ehdokkaat.reduce((acc, ehdokas) => {
    if (!acc[ehdokas.aanet]) acc[ehdokas.aanet] = [];
    acc[ehdokas.aanet].push({ ...ehdokas });
    return acc;
  }, {});

  // Arvotaan järjestys ryhmissä, joissa on useampi ehdokas
  const arvotutRyhmat = Object.values(ryhmat).map(ryhma => {
    if (ryhma.length > 1) {
      ryhma.forEach(e => (e.arvottu = true));
      ryhma.sort(() => 0.5 - Math.random()); // Better randomization
    }
    return ryhma;
  });

  // Yhdistetään kaikki ryhmät ja järjestetään laskevasti äänten mukaan
  const jarjestettyLista = arvotutRyhmat.flat().sort((a, b) => b.aanet - a.aanet);

  // Lasketaan äänten summa
  const aanetYhteensa = jarjestettyLista.reduce((sum, ehdokas) => sum + ehdokas.aanet, 0);

  // Lisätään vertausluvut ehdokkaille
  jarjestettyLista.forEach((ehdokas, index) => {
    ehdokas.vertausluku = Math.floor(aanetYhteensa / (index + 1));
  });

  return jarjestettyLista;
}

export { laskeVertausluvut };
