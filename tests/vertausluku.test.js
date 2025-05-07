// tests/vertausluku.test.js

import { describe, it, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import laskeVertausluvut from "../vertausluku.js";
import ehdokasRekisteri from "../ehdokasRekisteri.js";

describe("laskeVertausluvut", () => {
  beforeEach(() => {
    const ehdokkaat = [
      { numero: 201, nimi: "Anna Alho", aanet: 6 },
      { numero: 202, nimi: "Pekka Puro", aanet: 3 },
      { numero: 203, nimi: "Liisa Laine", aanet: 3 },
      { numero: 204, nimi: "Matti Meikäläinen", aanet: 1 },
    ];

    mock.method(ehdokasRekisteri, "haeLista", () => ehdokkaat);
  });

  afterEach(() => {
    mock.reset(ehdokasRekisteri.haeLista); // Use reset instead of restore
  });

  it("laskee eniten ääniä saaneen ehdokkaan vertausluvun oikein", () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista());
    assert.strictEqual(tulos[0].vertausluku, 13); // 13 ääntä yhteensä
  });

  it("merkitsee saman äänimäärän ehdokkaat arvotuiksi ja vaihtaa järjestystä", () => {
    const tulos1 = laskeVertausluvut(ehdokasRekisteri.haeLista());
    const tulos2 = laskeVertausluvut(ehdokasRekisteri.haeLista());

    const ryhma = tulos1.filter(e => e.aanet === 3);
    assert.ok(ryhma.every(e => e.arvottu === true));

    const jarjestys1 = ryhma.map(e => e.numero).join(",");
    const jarjestys2 = tulos2.filter(e => e.aanet === 3).map(e => e.numero).join(",");
    assert.notStrictEqual(jarjestys1, jarjestys2, "Järjestyksen pitäisi vaihdella");
  });

  it("laskee kaikkien ehdokkaiden vertausluvut oikein", () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista());
    const odotetut = [13, 6, 4, 3]; // Esimerkkilaskenta
    tulos.forEach((e, i) => {
      assert.strictEqual(e.vertausluku, odotetut[i]);
    });
  });
});
