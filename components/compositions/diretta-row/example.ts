const exampleStatisticsA = [
  {
    type: "Tiri in Porta",
    value: 3,
  },
  {
    type: "Tiri Fuori",
    value: 2,
  },
  {
    type: "Tiri Totali",
    value: 9,
  },
  {
    type: "Tiri Bloccati",
    value: 4,
  },
  {
    type: "Tiri in Area",
    value: 4,
  },
  {
    type: "Tiri da Fuori Area",
    value: 5,
  },
  {
    type: "Falli",
    value: 22,
  },
  {
    type: "Calci d'Angolo",
    value: 3,
  },
  {
    type: "Fuorigioco",
    value: 1,
  },
  {
    type: "Possesso Palla",
    value: "32%",
  },
  {
    type: "Cartellini Gialli",
    value: 5,
  },
  {
    type: "Cartellini Rossi",
    value: 1,
  },
  {
    type: "Parate del Portiere",
    value: null,
  },
  {
    type: "Passaggi Totali",
    value: 242,
  },
  {
    type: "Passaggi Riusciti",
    value: 121,
  },
  {
    type: "Percentuale Passaggi",
    value: null,
  },
];

export const getExampleStatistics = () => {
    return exampleStatisticsA.map((stat) => ({
        ...stat,
        value: Math.floor(Math.random() * 10),
    }));
}