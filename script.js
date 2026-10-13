/**
 * Liquid Love Heart • Core Interactive Engine
 * Faithfully re-creates the Python Turtle/Tkinter multilingual heart animation
 * with modern Liquid Glass aesthetics, Web Audio API, and 60fps Canvas.
 */

// Embedded original dataset computed by the uploaded Python algorithm
const HEART_ITEMS = [
  {
    "x": 44.4,
    "y": 143.89,
    "text": "Te amo",
    "size": 11,
    "edge": true,
    "color": [
      0.863,
      0.057,
      0.137
    ],
    "rad": 0.597
  },
  {
    "x": 60.48,
    "y": 166.89,
    "text": "Ich liebe dich",
    "size": 9,
    "edge": true,
    "color": [
      0.891,
      0.065,
      0.142
    ],
    "rad": 0.682
  },
  {
    "x": 53.47,
    "y": 120.89,
    "text": "Я тебя люблю",
    "size": 9,
    "edge": true,
    "color": [
      0.893,
      0.069,
      0.143
    ],
    "rad": 0.531
  },
  {
    "x": 89.71,
    "y": 212.89,
    "text": "Anh yêu em",
    "size": 9,
    "edge": true,
    "color": [
      0.934,
      0.078,
      0.15
    ],
    "rad": 0.851
  },
  {
    "x": 90.77,
    "y": 189.89,
    "text": "Seni seviyorum",
    "size": 11,
    "edge": true,
    "color": [
      0.922,
      0.075,
      0.148
    ],
    "rad": 0.781
  },
  {
    "x": 120.96,
    "y": 235.89,
    "text": "Σ' αγαπώ",
    "size": 10,
    "edge": true,
    "color": [
      0.931,
      0.072,
      0.148
    ],
    "rad": 0.955
  },
  {
    "x": 221.59,
    "y": 235.89,
    "text": "Te amo",
    "size": 10,
    "edge": true,
    "color": [
      0.932,
      0.07,
      0.148
    ],
    "rad": 1.0
  },
  {
    "x": 259.2,
    "y": 212.89,
    "text": "사랑해",
    "size": 9,
    "edge": true,
    "color": [
      0.944,
      0.078,
      0.151
    ],
    "rad": 1.0
  },
  {
    "x": 274.35,
    "y": 189.89,
    "text": "사랑해",
    "size": 12,
    "edge": true,
    "color": [
      0.945,
      0.078,
      0.151
    ],
    "rad": 1.0
  },
  {
    "x": 290.69,
    "y": 166.89,
    "text": "사랑해",
    "size": 11,
    "edge": true,
    "color": [
      0.932,
      0.07,
      0.148
    ],
    "rad": 1.0
  },
  {
    "x": 298.79,
    "y": 143.89,
    "text": "我爱你",
    "size": 11,
    "edge": true,
    "color": [
      0.942,
      0.076,
      0.15
    ],
    "rad": 1.0
  },
  {
    "x": 274.89,
    "y": 120.89,
    "text": "Seni seviyorum",
    "size": 11,
    "edge": true,
    "color": [
      0.919,
      0.065,
      0.145
    ],
    "rad": 0.962
  },
  {
    "x": 293.02,
    "y": 97.89,
    "text": "Eu te amo",
    "size": 12,
    "edge": true,
    "color": [
      0.926,
      0.068,
      0.147
    ],
    "rad": 0.973
  },
  {
    "x": 289.85,
    "y": 74.89,
    "text": "Ich liebe dich",
    "size": 9,
    "edge": true,
    "color": [
      0.923,
      0.069,
      0.147
    ],
    "rad": 0.933
  },
  {
    "x": 266.46,
    "y": 51.89,
    "text": "Jag älskar dig",
    "size": 12,
    "edge": true,
    "color": [
      0.91,
      0.067,
      0.145
    ],
    "rad": 0.841
  },
  {
    "x": 289.87,
    "y": 28.89,
    "text": "我爱你",
    "size": 9,
    "edge": true,
    "color": [
      0.925,
      0.072,
      0.148
    ],
    "rad": 0.887
  },
  {
    "x": 265.11,
    "y": 5.89,
    "text": "ฉันรักเธอ",
    "size": 11,
    "edge": true,
    "color": [
      0.935,
      0.08,
      0.15
    ],
    "rad": 0.799
  },
  {
    "x": 254.8,
    "y": -17.11,
    "text": "ฉันรักเธอ",
    "size": 9,
    "edge": true,
    "color": [
      0.907,
      0.069,
      0.145
    ],
    "rad": 0.76
  },
  {
    "x": 215.11,
    "y": -40.11,
    "text": "Seni seviyorum",
    "size": 9,
    "edge": true,
    "color": [
      0.89,
      0.066,
      0.142
    ],
    "rad": 0.641
  },
  {
    "x": 198.84,
    "y": -63.11,
    "text": "Kocham cię",
    "size": 10,
    "edge": true,
    "color": [
      0.867,
      0.058,
      0.138
    ],
    "rad": 0.6
  },
  {
    "x": 179.92,
    "y": -86.11,
    "text": "Eu te amo",
    "size": 10,
    "edge": true,
    "color": [
      0.851,
      0.054,
      0.135
    ],
    "rad": 0.563
  },
  {
    "x": 147.94,
    "y": -109.11,
    "text": "Anh yêu em",
    "size": 10,
    "edge": true,
    "color": [
      0.853,
      0.056,
      0.135
    ],
    "rad": 0.506
  },
  {
    "x": 133.11,
    "y": -132.11,
    "text": "Te amo",
    "size": 11,
    "edge": true,
    "color": [
      0.87,
      0.062,
      0.139
    ],
    "rad": 0.512
  },
  {
    "x": 91.68,
    "y": -155.11,
    "text": "Anh yêu em",
    "size": 11,
    "edge": true,
    "color": [
      0.909,
      0.076,
      0.146
    ],
    "rad": 0.484
  },
  {
    "x": 65.43,
    "y": -178.11,
    "text": "Anh yêu em",
    "size": 11,
    "edge": true,
    "color": [
      0.901,
      0.072,
      0.145
    ],
    "rad": 0.514
  },
  {
    "x": 59.06,
    "y": -201.11,
    "text": "Ti amo",
    "size": 10,
    "edge": true,
    "color": [
      0.892,
      0.068,
      0.143
    ],
    "rad": 0.578
  },
  {
    "x": 29.19,
    "y": -224.11,
    "text": "Je t'aime",
    "size": 10,
    "edge": true,
    "color": [
      0.907,
      0.072,
      0.145
    ],
    "rad": 0.633
  },
  {
    "x": -0.0,
    "y": -247.11,
    "text": "사랑해",
    "size": 11,
    "edge": true,
    "color": [
      0.882,
      0.061,
      0.14
    ],
    "rad": 0.702
  },
  {
    "x": 0.0,
    "y": -270.11,
    "text": "사랑해",
    "size": 9,
    "edge": true,
    "color": [
      0.906,
      0.068,
      0.144
    ],
    "rad": 0.778
  },
  {
    "x": -24.23,
    "y": -201.11,
    "text": "Ich liebe dich",
    "size": 12,
    "edge": true,
    "color": [
      0.909,
      0.074,
      0.146
    ],
    "rad": 0.556
  },
  {
    "x": -33.31,
    "y": -224.11,
    "text": "Ti amo",
    "size": 10,
    "edge": true,
    "color": [
      0.9,
      0.07,
      0.144
    ],
    "rad": 0.634
  },
  {
    "x": -77.77,
    "y": -178.11,
    "text": "Ti amo",
    "size": 11,
    "edge": true,
    "color": [
      0.854,
      0.056,
      0.135
    ],
    "rad": 0.529
  },
  {
    "x": -83.99,
    "y": -155.11,
    "text": "Ik hou van jou",
    "size": 10,
    "edge": true,
    "color": [
      0.892,
      0.07,
      0.143
    ],
    "rad": 0.472
  },
  {
    "x": -114.15,
    "y": -132.11,
    "text": "Kocham cię",
    "size": 11,
    "edge": true,
    "color": [
      0.878,
      0.066,
      0.14
    ],
    "rad": 0.47
  },
  {
    "x": -159.99,
    "y": -109.11,
    "text": "Ti amo",
    "size": 10,
    "edge": true,
    "color": [
      0.892,
      0.069,
      0.143
    ],
    "rad": 0.537
  },
  {
    "x": -156.64,
    "y": -86.11,
    "text": "Я тебе кохаю",
    "size": 11,
    "edge": true,
    "color": [
      0.892,
      0.07,
      0.143
    ],
    "rad": 0.497
  },
  {
    "x": -208.9,
    "y": -63.11,
    "text": "사랑해",
    "size": 12,
    "edge": true,
    "color": [
      0.905,
      0.072,
      0.145
    ],
    "rad": 0.629
  },
  {
    "x": -236.02,
    "y": -40.11,
    "text": "사랑해",
    "size": 10,
    "edge": true,
    "color": [
      0.896,
      0.066,
      0.143
    ],
    "rad": 0.703
  },
  {
    "x": -217.42,
    "y": -17.11,
    "text": "Seni seviyorum",
    "size": 11,
    "edge": true,
    "color": [
      0.906,
      0.071,
      0.145
    ],
    "rad": 0.649
  },
  {
    "x": -257.67,
    "y": 5.89,
    "text": "Σ' αγαπώ",
    "size": 11,
    "edge": true,
    "color": [
      0.901,
      0.065,
      0.143
    ],
    "rad": 0.778
  },
  {
    "x": -268.71,
    "y": 28.89,
    "text": "Je t'aime",
    "size": 12,
    "edge": true,
    "color": [
      0.913,
      0.069,
      0.146
    ],
    "rad": 0.825
  },
  {
    "x": -276.96,
    "y": 51.89,
    "text": "Я тебе кохаю",
    "size": 9,
    "edge": true,
    "color": [
      0.933,
      0.077,
      0.149
    ],
    "rad": 0.87
  },
  {
    "x": -273.13,
    "y": 74.89,
    "text": "मैं तुमसे प्यार करता हूँ",
    "size": 9,
    "edge": true,
    "color": [
      0.911,
      0.065,
      0.144
    ],
    "rad": 0.887
  },
  {
    "x": -297.67,
    "y": 97.89,
    "text": "ฉันรักเธอ",
    "size": 10,
    "edge": true,
    "color": [
      0.95,
      0.082,
      0.153
    ],
    "rad": 0.985
  },
  {
    "x": -269.3,
    "y": 120.89,
    "text": "Я тебя люблю",
    "size": 11,
    "edge": true,
    "color": [
      0.921,
      0.067,
      0.146
    ],
    "rad": 0.948
  },
  {
    "x": -269.61,
    "y": 143.89,
    "text": "मैं तुमसे प्यार करता हूँ",
    "size": 9,
    "edge": true,
    "color": [
      0.936,
      0.073,
      0.149
    ],
    "rad": 0.991
  },
  {
    "x": -266.44,
    "y": 166.89,
    "text": "Jag älskar dig",
    "size": 10,
    "edge": true,
    "color": [
      0.94,
      0.075,
      0.15
    ],
    "rad": 1.0
  },
  {
    "x": -268.27,
    "y": 189.89,
    "text": "ฉันรักเธอ",
    "size": 11,
    "edge": true,
    "color": [
      0.949,
      0.081,
      0.152
    ],
    "rad": 1.0
  },
  {
    "x": -240.19,
    "y": 212.89,
    "text": "愛してる",
    "size": 12,
    "edge": true,
    "color": [
      0.927,
      0.067,
      0.147
    ],
    "rad": 1.0
  },
  {
    "x": -191.97,
    "y": 235.89,
    "text": "Ich liebe dich",
    "size": 12,
    "edge": true,
    "color": [
      0.948,
      0.08,
      0.152
    ],
    "rad": 1.0
  },
  {
    "x": -114.14,
    "y": 212.89,
    "text": "Aku cinta kamu",
    "size": 12,
    "edge": true,
    "color": [
      0.933,
      0.077,
      0.149
    ],
    "rad": 0.877
  },
  {
    "x": -107.73,
    "y": 235.89,
    "text": "Ti amo",
    "size": 10,
    "edge": true,
    "color": [
      0.937,
      0.076,
      0.15
    ],
    "rad": 0.94
  },
  {
    "x": -53.4,
    "y": 189.89,
    "text": "사랑해",
    "size": 9,
    "edge": true,
    "color": [
      0.928,
      0.078,
      0.149
    ],
    "rad": 0.75
  },
  {
    "x": -30.77,
    "y": 120.89,
    "text": "I love you",
    "size": 9,
    "edge": true,
    "color": [
      0.874,
      0.063,
      0.139
    ],
    "rad": 0.515
  },
  {
    "x": -39.93,
    "y": 166.89,
    "text": "我爱你",
    "size": 9,
    "edge": true,
    "color": [
      0.879,
      0.06,
      0.139
    ],
    "rad": 0.668
  },
  {
    "x": -34.3,
    "y": 143.89,
    "text": "ฉันรักเธอ",
    "size": 9,
    "edge": true,
    "color": [
      0.879,
      0.063,
      0.14
    ],
    "rad": 0.591
  },
  {
    "x": 181.96,
    "y": 212.89,
    "text": "Ik hou van jou",
    "size": 9,
    "edge": false,
    "color": [
      0.919,
      0.064,
      0.145
    ],
    "rad": 0.973
  },
  {
    "x": 226.45,
    "y": 166.89,
    "text": "ฉันรักเธอ",
    "size": 12,
    "edge": false,
    "color": [
      0.896,
      0.053,
      0.14
    ],
    "rad": 0.942
  },
  {
    "x": 197.81,
    "y": 189.89,
    "text": "Ti amo",
    "size": 10,
    "edge": false,
    "color": [
      0.917,
      0.065,
      0.145
    ],
    "rad": 0.94
  },
  {
    "x": -191.31,
    "y": 189.89,
    "text": "Te amo",
    "size": 11,
    "edge": false,
    "color": [
      0.888,
      0.05,
      0.139
    ],
    "rad": 0.928
  },
  {
    "x": 221.83,
    "y": 143.89,
    "text": "Seni seviyorum",
    "size": 9,
    "edge": false,
    "color": [
      0.876,
      0.048,
      0.137
    ],
    "rad": 0.88
  },
  {
    "x": -118.35,
    "y": 189.89,
    "text": "Je t'aime",
    "size": 9,
    "edge": false,
    "color": [
      0.883,
      0.056,
      0.139
    ],
    "rad": 0.813
  },
  {
    "x": -222.14,
    "y": 97.89,
    "text": "Jag älskar dig",
    "size": 9,
    "edge": false,
    "color": [
      0.869,
      0.051,
      0.136
    ],
    "rad": 0.789
  },
  {
    "x": 146.21,
    "y": 166.89,
    "text": "Я тебе кохаю",
    "size": 9,
    "edge": false,
    "color": [
      0.854,
      0.044,
      0.133
    ],
    "rad": 0.788
  },
  {
    "x": -140.44,
    "y": 166.89,
    "text": "मैं तुमसे प्यार करता हूँ",
    "size": 9,
    "edge": false,
    "color": [
      0.851,
      0.043,
      0.133
    ],
    "rad": 0.779
  },
  {
    "x": 211.5,
    "y": 97.89,
    "text": "I love you",
    "size": 11,
    "edge": false,
    "color": [
      0.85,
      0.044,
      0.133
    ],
    "rad": 0.763
  },
  {
    "x": -167.34,
    "y": 143.89,
    "text": "Eu te amo",
    "size": 12,
    "edge": false,
    "color": [
      0.874,
      0.054,
      0.138
    ],
    "rad": 0.766
  },
  {
    "x": 209.21,
    "y": 74.89,
    "text": "Anh yêu em",
    "size": 9,
    "edge": false,
    "color": [
      0.864,
      0.052,
      0.136
    ],
    "rad": 0.717
  },
  {
    "x": 157.68,
    "y": 120.89,
    "text": "Aku cinta kamu",
    "size": 11,
    "edge": false,
    "color": [
      0.831,
      0.041,
      0.13
    ],
    "rad": 0.69
  },
  {
    "x": -166.13,
    "y": 120.89,
    "text": "Eu te amo",
    "size": 10,
    "edge": false,
    "color": [
      0.84,
      0.043,
      0.131
    ],
    "rad": 0.708
  },
  {
    "x": -93.57,
    "y": 143.89,
    "text": "我爱你",
    "size": 12,
    "edge": false,
    "color": [
      0.841,
      0.047,
      0.132
    ],
    "rad": 0.645
  },
  {
    "x": -184.99,
    "y": 74.89,
    "text": "사랑해",
    "size": 12,
    "edge": false,
    "color": [
      0.857,
      0.052,
      0.135
    ],
    "rad": 0.655
  },
  {
    "x": 210.98,
    "y": 28.89,
    "text": "Aku cinta kamu",
    "size": 11,
    "edge": false,
    "color": [
      0.833,
      0.043,
      0.13
    ],
    "rad": 0.66
  },
  {
    "x": 124.36,
    "y": 143.89,
    "text": "Ik hou van jou",
    "size": 10,
    "edge": false,
    "color": [
      0.859,
      0.052,
      0.135
    ],
    "rad": 0.69
  },
  {
    "x": -203.82,
    "y": 28.89,
    "text": "Te amo",
    "size": 10,
    "edge": false,
    "color": [
      0.846,
      0.049,
      0.133
    ],
    "rad": 0.64
  },
  {
    "x": -171.98,
    "y": 51.89,
    "text": "Я тебя люблю",
    "size": 11,
    "edge": false,
    "color": [
      0.815,
      0.04,
      0.127
    ],
    "rad": 0.583
  },
  {
    "x": -95.45,
    "y": 120.89,
    "text": "Te amo",
    "size": 9,
    "edge": false,
    "color": [
      0.802,
      0.035,
      0.125
    ],
    "rad": 0.581
  },
  {
    "x": 133.97,
    "y": 97.89,
    "text": "Σ' αγαπώ",
    "size": 11,
    "edge": false,
    "color": [
      0.859,
      0.056,
      0.136
    ],
    "rad": 0.587
  },
  {
    "x": -122.61,
    "y": 97.89,
    "text": "Ich liebe dich",
    "size": 12,
    "edge": false,
    "color": [
      0.845,
      0.052,
      0.133
    ],
    "rad": 0.565
  },
  {
    "x": 202.13,
    "y": -17.11,
    "text": "Ti amo",
    "size": 10,
    "edge": false,
    "color": [
      0.813,
      0.038,
      0.127
    ],
    "rad": 0.604
  },
  {
    "x": -174.85,
    "y": 5.89,
    "text": "Jag älskar dig",
    "size": 9,
    "edge": false,
    "color": [
      0.804,
      0.038,
      0.126
    ],
    "rad": 0.536
  },
  {
    "x": 188.29,
    "y": 5.89,
    "text": "Eu te amo",
    "size": 12,
    "edge": false,
    "color": [
      0.857,
      0.056,
      0.136
    ],
    "rad": 0.575
  },
  {
    "x": 144.07,
    "y": 74.89,
    "text": "我爱你",
    "size": 10,
    "edge": false,
    "color": [
      0.841,
      0.05,
      0.133
    ],
    "rad": 0.557
  },
  {
    "x": 146.97,
    "y": 51.89,
    "text": "Ik hou van jou",
    "size": 12,
    "edge": false,
    "color": [
      0.798,
      0.036,
      0.124
    ],
    "rad": 0.519
  },
  {
    "x": -141.94,
    "y": 28.89,
    "text": "Σ' αγαπώ",
    "size": 10,
    "edge": false,
    "color": [
      0.787,
      0.035,
      0.123
    ],
    "rad": 0.469
  },
  {
    "x": -14.67,
    "y": -178.11,
    "text": "愛してる",
    "size": 9,
    "edge": false,
    "color": [
      0.829,
      0.049,
      0.131
    ],
    "rad": 0.478
  },
  {
    "x": 146.95,
    "y": -17.11,
    "text": "Je t'aime",
    "size": 9,
    "edge": false,
    "color": [
      0.824,
      0.048,
      0.13
    ],
    "rad": 0.441
  },
  {
    "x": -111.85,
    "y": 74.89,
    "text": "Я тебе кохаю",
    "size": 9,
    "edge": false,
    "color": [
      0.811,
      0.042,
      0.127
    ],
    "rad": 0.487
  },
  {
    "x": -154.03,
    "y": -63.11,
    "text": "Ti amo",
    "size": 11,
    "edge": false,
    "color": [
      0.79,
      0.036,
      0.123
    ],
    "rad": 0.469
  },
  {
    "x": -150.83,
    "y": -40.11,
    "text": "Aku cinta kamu",
    "size": 12,
    "edge": false,
    "color": [
      0.793,
      0.038,
      0.124
    ],
    "rad": 0.449
  },
  {
    "x": -105.0,
    "y": -109.11,
    "text": "我爱你",
    "size": 9,
    "edge": false,
    "color": [
      0.784,
      0.037,
      0.123
    ],
    "rad": 0.4
  },
  {
    "x": 125.1,
    "y": 28.89,
    "text": "ฉันรักเธอ",
    "size": 10,
    "edge": false,
    "color": [
      0.816,
      0.046,
      0.129
    ],
    "rad": 0.425
  },
  {
    "x": 45.44,
    "y": 97.89,
    "text": "Ik hou van jou",
    "size": 10,
    "edge": false,
    "color": [
      0.829,
      0.05,
      0.131
    ],
    "rad": 0.452
  },
  {
    "x": -36.08,
    "y": 97.89,
    "text": "Σ' αγαπώ",
    "size": 9,
    "edge": false,
    "color": [
      0.792,
      0.038,
      0.124
    ],
    "rad": 0.444
  },
  {
    "x": 6.1,
    "y": -155.11,
    "text": "Ti amo",
    "size": 9,
    "edge": false,
    "color": [
      0.829,
      0.051,
      0.131
    ],
    "rad": 0.4
  },
  {
    "x": -124.25,
    "y": -17.11,
    "text": "ฉันรักเธอ",
    "size": 12,
    "edge": false,
    "color": [
      0.825,
      0.051,
      0.131
    ],
    "rad": 0.374
  },
  {
    "x": -76.49,
    "y": 51.89,
    "text": "Je t'aime",
    "size": 10,
    "edge": false,
    "color": [
      0.827,
      0.052,
      0.131
    ],
    "rad": 0.361
  },
  {
    "x": 74.93,
    "y": 74.89,
    "text": "Ich liebe dich",
    "size": 9,
    "edge": false,
    "color": [
      0.809,
      0.044,
      0.127
    ],
    "rad": 0.42
  },
  {
    "x": 104.61,
    "y": -86.11,
    "text": "I love you",
    "size": 11,
    "edge": false,
    "color": [
      0.822,
      0.05,
      0.13
    ],
    "rad": 0.356
  },
  {
    "x": 113.46,
    "y": 5.89,
    "text": "Te amo",
    "size": 12,
    "edge": false,
    "color": [
      0.763,
      0.031,
      0.119
    ],
    "rad": 0.361
  },
  {
    "x": 68.36,
    "y": -132.11,
    "text": "愛してる",
    "size": 10,
    "edge": false,
    "color": [
      0.788,
      0.038,
      0.124
    ],
    "rad": 0.383
  },
  {
    "x": 136.42,
    "y": -40.11,
    "text": "Eu te amo",
    "size": 9,
    "edge": false,
    "color": [
      0.826,
      0.05,
      0.131
    ],
    "rad": 0.407
  },
  {
    "x": 119.96,
    "y": -63.11,
    "text": "愛してる",
    "size": 12,
    "edge": false,
    "color": [
      0.823,
      0.05,
      0.13
    ],
    "rad": 0.37
  },
  {
    "x": -17.71,
    "y": 74.89,
    "text": "Kocham cię",
    "size": 12,
    "edge": false,
    "color": [
      0.822,
      0.05,
      0.13
    ],
    "rad": 0.359
  },
  {
    "x": 53.49,
    "y": 51.89,
    "text": "Σ' αγαπώ",
    "size": 9,
    "edge": false,
    "color": [
      0.759,
      0.031,
      0.119
    ],
    "rad": 0.322
  },
  {
    "x": 45.96,
    "y": -109.11,
    "text": "Ich liebe dich",
    "size": 12,
    "edge": false,
    "color": [
      0.76,
      0.033,
      0.119
    ],
    "rad": 0.284
  },
  {
    "x": -72.33,
    "y": -86.11,
    "text": "Te amo",
    "size": 11,
    "edge": false,
    "color": [
      0.806,
      0.047,
      0.128
    ],
    "rad": 0.276
  },
  {
    "x": -100.02,
    "y": 5.89,
    "text": "I love you",
    "size": 9,
    "edge": false,
    "color": [
      0.79,
      0.041,
      0.124
    ],
    "rad": 0.324
  },
  {
    "x": -17.4,
    "y": -132.11,
    "text": "Ich liebe dich",
    "size": 11,
    "edge": false,
    "color": [
      0.807,
      0.046,
      0.128
    ],
    "rad": 0.329
  },
  {
    "x": -45.02,
    "y": -109.11,
    "text": "Σ' αγαπώ",
    "size": 9,
    "edge": false,
    "color": [
      0.795,
      0.044,
      0.126
    ],
    "rad": 0.283
  },
  {
    "x": 91.28,
    "y": -17.11,
    "text": "사랑해",
    "size": 11,
    "edge": false,
    "color": [
      0.785,
      0.041,
      0.124
    ],
    "rad": 0.277
  },
  {
    "x": -70.06,
    "y": 28.89,
    "text": "愛してる",
    "size": 12,
    "edge": false,
    "color": [
      0.759,
      0.032,
      0.119
    ],
    "rad": 0.292
  },
  {
    "x": 53.21,
    "y": 28.89,
    "text": "Ik hou van jou",
    "size": 9,
    "edge": false,
    "color": [
      0.731,
      0.025,
      0.114
    ],
    "rad": 0.258
  },
  {
    "x": -10.5,
    "y": 51.89,
    "text": "사랑해",
    "size": 12,
    "edge": false,
    "color": [
      0.774,
      0.037,
      0.122
    ],
    "rad": 0.282
  },
  {
    "x": -80.16,
    "y": -63.11,
    "text": "Ich liebe dich",
    "size": 10,
    "edge": false,
    "color": [
      0.773,
      0.038,
      0.122
    ],
    "rad": 0.258
  },
  {
    "x": -10.67,
    "y": 28.89,
    "text": "사랑해",
    "size": 9,
    "edge": false,
    "color": [
      0.737,
      0.028,
      0.115
    ],
    "rad": 0.207
  },
  {
    "x": 39.29,
    "y": -86.11,
    "text": "Ti amo",
    "size": 10,
    "edge": false,
    "color": [
      0.724,
      0.024,
      0.113
    ],
    "rad": 0.209
  },
  {
    "x": 51.59,
    "y": -63.11,
    "text": "Σ' αγαπώ",
    "size": 9,
    "edge": false,
    "color": [
      0.71,
      0.021,
      0.11
    ],
    "rad": 0.182
  },
  {
    "x": -14.52,
    "y": -86.11,
    "text": "사랑해",
    "size": 11,
    "edge": false,
    "color": [
      0.735,
      0.029,
      0.115
    ],
    "rad": 0.179
  },
  {
    "x": 65.23,
    "y": -40.11,
    "text": "Σ' αγαπώ",
    "size": 12,
    "edge": false,
    "color": [
      0.732,
      0.027,
      0.115
    ],
    "rad": 0.195
  },
  {
    "x": -57.14,
    "y": -40.11,
    "text": "Te amo",
    "size": 12,
    "edge": false,
    "color": [
      0.71,
      0.022,
      0.111
    ],
    "rad": 0.172
  },
  {
    "x": -59.57,
    "y": -17.11,
    "text": "I love you",
    "size": 9,
    "edge": false,
    "color": [
      0.759,
      0.035,
      0.119
    ],
    "rad": 0.185
  },
  {
    "x": 39.13,
    "y": 5.89,
    "text": "Kocham cię",
    "size": 10,
    "edge": false,
    "color": [
      0.758,
      0.035,
      0.119
    ],
    "rad": 0.174
  },
  {
    "x": -36.19,
    "y": 5.89,
    "text": "Je t'aime",
    "size": 10,
    "edge": false,
    "color": [
      0.751,
      0.033,
      0.118
    ],
    "rad": 0.168
  },
  {
    "x": -6.28,
    "y": -63.11,
    "text": "ฉันรักเธอ",
    "size": 9,
    "edge": false,
    "color": [
      0.741,
      0.032,
      0.117
    ],
    "rad": 0.1
  },
  {
    "x": 17.6,
    "y": -17.11,
    "text": "Aku cinta kamu",
    "size": 9,
    "edge": false,
    "color": [
      0.681,
      0.016,
      0.106
    ],
    "rad": 0.075
  },
  {
    "x": 0.05,
    "y": -40.11,
    "text": "Ti amo",
    "size": 10,
    "edge": false,
    "color": [
      0.761,
      0.04,
      0.121
    ],
    "rad": 0.022
  }
];

// Uploaded Python script source code
const PYTHON_SCRIPT_SOURCE = "import math as m\nimport random as r\nimport turtle as t\nimport tkinter.font as tkf\n\nSC = 21\nOY = 20\nDURATION = 10\nTICK = 16\nANIM = 42\nLIFT = 34\nGAP = 7\nSIZES = (9, 10, 11, 12)\nFONT = \"Arial\"\nBG = \"#060208\"\n\ns = t.Screen()\ns.setup(800, 800)\ns.bgcolor(BG)\ns.title(\"Love Heart\")\ns.tracer(0)\n\ncv = s.getcanvas()\nrng = r.Random(11)\n\nPHRASES = [\n    \"I love you\", \"Seni seviyorum\", \"Te amo\", \"Je t'aime\",\n    \"Ich liebe dich\", \"Ti amo\", \"Eu te amo\", \"\u042f \u0442\u0435\u0431\u044f \u043b\u044e\u0431\u043b\u044e\",\n    \"\uc0ac\ub791\ud574\", \"\u611b\u3057\u3066\u308b\", \"\u6211\u7231\u4f60\", \"\u092e\u0948\u0902 \u0924\u0941\u092e\u0938\u0947 \u092a\u094d\u092f\u093e\u0930 \u0915\u0930\u0924\u093e \u0939\u0942\u0901\",\n    \"\u03a3' \u03b1\u03b3\u03b1\u03c0\u03ce\", \"Ik hou van jou\", \"Jag \u00e4lskar dig\", \"Kocham ci\u0119\",\n    \"\u0e09\u0e31\u0e19\u0e23\u0e31\u0e01\u0e40\u0e18\u0e2d\", \"Anh y\u00eau em\", \"Aku cinta kamu\", \"\u042f \u0442\u0435\u0431\u0435 \u043a\u043e\u0445\u0430\u044e\",\n]\n\n_fonts = {}\n\n\ndef font_for(size):\n    if size not in _fonts:\n        _fonts[size] = tkf.Font(\n            root=cv, family=FONT, size=size, weight=\"bold\"\n        )\n    return _fonts[size]\n\n\ndef heart(a):\n    x = 16 * (m.sin(a) ** 3)\n    y = (\n        13 * m.cos(a)\n        - 5 * m.cos(2 * a)\n        - 2 * m.cos(3 * a)\n        - m.cos(4 * a)\n    )\n    return x * SC, y * SC + OY\n\n\ndef hx(c):\n    return \"#%02x%02x%02x\" % tuple(\n        int(max(0, min(1, v)) * 255) for v in c\n    )\n\n\ndef mix(a, b, k):\n    return tuple(p + (q - p) * k for p, q in zip(a, b))\n\n\ndef dim(c, k):\n    return tuple(v * k for v in c)\n\n\nPOLY = [heart(2 * m.pi * i / 720) for i in range(720)]\nEDGES = list(zip(POLY, POLY[1:] + POLY[:1]))\nYMAX = max(p[1] for p in POLY)\nYMIN = min(p[1] for p in POLY)\nCY = (YMAX + YMIN) / 2\n\n\ndef spans(y):\n    xs = []\n    for (x1, y1), (x2, y2) in EDGES:\n        if (y1 <= y < y2) or (y2 <= y < y1):\n            xs.append(x1 + (y - y1) * (x2 - x1) / (y2 - y1))\n    xs.sort()\n    return list(zip(xs[0::2], xs[1::2]))\n\n\ndef intersect(A, B):\n    out = []\n    for a in A:\n        for b in B:\n            lo, hi = max(a[0], b[0]), min(a[1], b[1])\n            if hi - lo > 14:\n                out.append((lo, hi))\n    return out\n\n\ndef phrase_cycle():\n    while True:\n        order = PHRASES[:]\n        rng.shuffle(order)\n        yield from order\n\n\ndef build():\n    cycle = phrase_cycle()\n    row_h = max(font_for(z).metrics(\"linespace\") for z in SIZES) + 4\n    half = row_h / 2\n    placed = []\n\n    y = YMAX - half\n    while y > YMIN + half:\n        row = intersect(spans(y + half), spans(y - half))\n\n        for lo, hi in row:\n            lo += 4\n            hi -= 4\n            cur = lo + rng.uniform(0, 8)\n            line = []\n\n            while True:\n                fit = None\n                for _ in range(10):\n                    text = next(cycle)\n                    size = rng.choice(SIZES)\n                    w = font_for(size).measure(text)\n                    if cur + w <= hi:\n                        fit = (text, size, w)\n                        break\n                if not fit:\n                    break\n                text, size, w = fit\n                line.append([cur + w / 2, text, size, w])\n                cur += w + GAP\n\n            if not line:\n                continue\n\n            if len(line) > 1:\n                left = hi - (line[-1][0] + line[-1][3] / 2)\n                for i, it in enumerate(line):\n                    it[0] += left * i / (len(line) - 1)\n            else:\n                line[0][0] = (lo + hi) / 2\n\n            for i, (x, text, size, w) in enumerate(line):\n                edge = i == 0 or i == len(line) - 1\n                placed.append(dict(x=x, y=y, text=text, size=size, edge=edge))\n\n        y -= row_h\n\n    wine = (0.58, 0.0, 0.09)\n    crimson = (0.90, 0.05, 0.14)\n    blood = (0.98, 0.10, 0.16)\n    for p in placed:\n        rad = min(1.0, math_dist(p[\"x\"], p[\"y\"]))\n        base = mix(wine, crimson, 0.25 + 0.75 * rad)\n        base = mix(base, blood, rng.uniform(0, 0.35) + (0.3 if p[\"edge\"] else 0))\n        p[\"color\"] = tuple(min(1, v) for v in base)\n        p[\"rad\"] = rad\n\n    edges = [p for p in placed if p[\"edge\"]]\n    inner = [p for p in placed if not p[\"edge\"]]\n    edges.sort(key=lambda p: m.atan2(p[\"x\"], p[\"y\"] - CY) % (2 * m.pi))\n    inner.sort(key=lambda p: -p[\"rad\"] + rng.uniform(0, 0.08))\n    return edges + inner\n\n\ndef math_dist(x, y):\n    return m.hypot(x / (16 * SC), (y - CY) / (14.5 * SC))\n\n\nFLASH = (1.0, 0.78, 0.78)\nmain_ids = []\nactive = []\ntick_no = 0\n\n\ndef clamp(v):\n    return max(0.0, min(1.0, v))\n\n\ndef spawn(p):\n    x, y = p[\"x\"], -p[\"y\"]\n    size, text, c = p[\"size\"], p[\"text\"], p[\"color\"]\n    font = (FONT, size, \"bold\")\n    big = (FONT, size + 1, \"bold\")\n\n    shadow = cv.create_text(x + 2, y + 3, text=text, font=font, fill=BG)\n    halo = cv.create_text(x, y, text=text, font=big, fill=BG)\n    main = cv.create_text(x, y - LIFT, text=text, font=font, fill=BG)\n\n    p.update(shadow=shadow, halo=halo, main=main,\n             f=0, dx=rng.uniform(-10, 10))\n    main_ids.append((main, c))\n    active.append(p)\n\n\ndef animate(p):\n    p[\"f\"] += 1\n    u = clamp(p[\"f\"] / ANIM)\n    e = 1 - (1 - u) ** 3\n    c = p[\"color\"]\n    x, y = p[\"x\"], -p[\"y\"]\n    hover = (1 - e) * LIFT\n    px = x + p[\"dx\"] * (1 - e)\n    py = y - hover\n\n    cv.itemconfig(p[\"shadow\"], fill=hx(mix(BGC, dim(c, 0.30), e)))\n    cv.itemconfig(p[\"halo\"], fill=hx(mix(BGC, dim(c, 0.20), e * e)))\n    cv.coords(p[\"halo\"], px, py)\n\n    flash = 0.75 * math_sin(clamp((u - 0.55) / 0.45))\n    col = mix(mix(BGC, c, e ** 1.5), FLASH, flash)\n    cv.itemconfig(p[\"main\"], fill=hx(col))\n    cv.coords(p[\"main\"], px, py)\n\n    if u >= 1:\n        cv.coords(p[\"halo\"], x, y)\n        cv.coords(p[\"main\"], x, y)\n        cv.itemconfig(p[\"main\"], fill=hx(c))\n        return False\n    return True\n\n\ndef math_sin(v):\n    return m.sin(m.pi * v)\n\n\nBGC = tuple(int(BG[i:i + 2], 16) / 255 for i in (1, 3, 5))\nORDER = build()\nitems = iter(ORDER)\nRATE = len(ORDER) / (DURATION * 1000 / TICK)\nacc = 0.0\nspawning = True\n\n\ndef step():\n    global spawning, acc\n    if spawning:\n        acc += RATE\n        try:\n            while acc >= 1:\n                acc -= 1\n                spawn(next(items))\n        except StopIteration:\n            spawning = False\n\n    active[:] = [p for p in active if animate(p)]\n\n    if not spawning and not active:\n        shimmer()\n        return\n    cv.after(TICK, step)\n\n\ndef _safe(i, c):\n    try:\n        cv.itemconfig(i, fill=hx(c))\n    except Exception:\n        pass\n\n\ndef shimmer():\n    for _ in range(1):\n        i, c = rng.choice(main_ids)\n        _safe(i, mix(c, FLASH, 0.6))\n        cv.after(260, lambda i=i, c=c: _safe(i, c))\n    cv.after(140, shimmer)\n\n\ntry:\n    cv.after(200, step)\n    t.done()\nexcept (t.Terminator, Exception):\n    pass\n";

/* =====================================================================
   APP STATE & CONFIGURATION
   ===================================================================== */
const CONFIG = {
  baseWidth: 800,
  baseHeight: 800,
  animDuration: 10,     // seconds
  animFrames: 42,       // ANIM frames per item
  liftDistance: 34,     // LIFT pixels
  fontFamily: 'Arial, -apple-system, sans-serif',
  bgColor: [6, 2, 8],   // #060208
  flashColor: [1.0, 0.78, 0.78],
  speedMultiplier: 1.0,
  particlesEnabled: true,
  shimmerEnabled: true,
  soundEnabled: false
};

let state = {
  activeView: 'landing', // 'landing' | 'hero'
  placedItems: [],
  activeItems: [],
  settledItems: [],
  shimmeringItems: new Map(), // itemId -> { flashIntensity, startTime }
  spawning: false,
  spawnIndex: 0,
  spawnAcc: 0,
  lastFrameTime: performance.now(),
  mouse: { x: -1000, y: -1000, isHover: false },
  audioCtx: null,
  nextChimeTime: 0
};

/* =====================================================================
   DOM ELEMENTS
   ===================================================================== */
const landingView = document.getElementById('landing-view');
const heroView = document.getElementById('hero-view');
const enterHeartBtn = document.getElementById('enter-heart-btn');
const backToLandingBtn = document.getElementById('back-to-landing-btn');
const replayBtn = document.getElementById('replay-btn');
const dockReplayBtn = document.getElementById('dock-replay-btn');
const heartCanvas = document.getElementById('heart-canvas');
const heartCtx = heartCanvas.getContext('2d');
const ambientCanvas = document.getElementById('ambient-canvas');
const ambientCtx = ambientCanvas.getContext('2d');
const cursorGlow = document.getElementById('cursor-glow');
const statusBadge = document.getElementById('animation-status-badge');
const statusText = document.getElementById('status-text');
const audioToggleBtn = document.getElementById('audio-toggle-btn');
const soundIcon = document.getElementById('sound-icon');
const codeModal = document.getElementById('code-modal');
const openCodeModalBtn = document.getElementById('open-code-modal-btn');
const viewScriptBtnLanding = document.getElementById('view-script-btn-landing');
const closeModalBtn = document.getElementById('close-modal-btn');
const copyCodeBtn = document.getElementById('copy-code-btn');
const copyCodeText = document.getElementById('copy-code-text');
const pythonCodeContent = document.getElementById('python-code-content');
const modalRunPythonBtn = document.getElementById('modal-run-python-btn');
const dockRunNativeBtn = document.getElementById('dock-run-native-btn');
const dockParticlesBtn = document.getElementById('dock-particles-btn');
const dockShimmerBtn = document.getElementById('dock-shimmer-btn');
const speedButtons = document.querySelectorAll('.dock-speed-btn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

/* =====================================================================
   INITIALIZATION
   ===================================================================== */
window.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  initAmbientParticles();
  initModalCode();
  setupEventListeners();
  
  // Handle URL hash navigation
  if (window.location.hash === '#heart' || window.location.hash === '#hero') {
    switchView('hero');
  }

  requestAnimationFrame(mainAnimationLoop);
});

window.addEventListener('resize', () => {
  resizeCanvases();
});

function initCanvas() {
  resizeCanvases();
}

function resizeCanvases() {
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;

  ambientCanvas.width = w * dpr;
  ambientCanvas.height = h * dpr;
  ambientCtx.scale(dpr, dpr);

  heartCanvas.width = w * dpr;
  heartCanvas.height = h * dpr;
  heartCtx.scale(dpr, dpr);
}

function showToast(msg) {
  toastMessage.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* =====================================================================
   VIEW NAVIGATION
   ===================================================================== */
function switchView(viewName) {
  if (state.activeView === viewName) return;
  state.activeView = viewName;

  if (viewName === 'hero') {
    landingView.classList.remove('active');
    setTimeout(() => {
      heroView.classList.add('active');
      window.location.hash = 'heart';
      startHeartAnimation();
    }, 200);
  } else {
    heroView.classList.remove('active');
    setTimeout(() => {
      landingView.classList.add('active');
      window.location.hash = '';
      stopHeartAnimation();
    }, 200);
  }
}

window.addEventListener('popstate', () => {
  if (window.location.hash === '#heart' || window.location.hash === '#hero') {
    switchView('hero');
  } else {
    switchView('landing');
  }
});

/* =====================================================================
   AUDIO SYNTHESIZER (WEB AUDIO API)
   Generates ethereal romantic chimes, warm sub-bass, and celestial chords
   ===================================================================== */
function initAudio() {
  if (!state.audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    state.audioCtx = new AudioContext();
  }
  if (state.audioCtx.state === 'suspended') {
    state.audioCtx.resume();
  }
}

// Pentatonic warm romantic notes
const CHIME_FREQS = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];

function playHarmonicChime(freqIndex = null, gainMultiplier = 1.0) {
  if (!CONFIG.soundEnabled || !state.audioCtx) return;
  try {
    const ctx = state.audioCtx;
    const now = ctx.currentTime;
    
    const freq = freqIndex !== null 
      ? CHIME_FREQS[freqIndex % CHIME_FREQS.length]
      : CHIME_FREQS[Math.floor(Math.random() * CHIME_FREQS.length)];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm soft bell tone envelope
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 1.2);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.09 * gainMultiplier, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.6);
  } catch (e) {
    // Silently handle audio context restrictions
  }
}

function playHeartbeatThump() {
  if (!CONFIG.soundEnabled || !state.audioCtx) return;
  try {
    const ctx = state.audioCtx;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(75, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.25);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  } catch (e) {}
}

/* =====================================================================
   HEART ANIMATION ENGINE (FAITHFUL TO PYTHON SCRIPT)
   ===================================================================== */
function startHeartAnimation() {
  state.activeItems = [];
  state.settledItems = [];
  state.shimmeringItems.clear();
  state.spawning = true;
  state.spawnIndex = 0;
  state.spawnAcc = 0;

  statusBadge.style.opacity = '1';
  statusText.textContent = 'Weaving multilingual affirmations...';

  if (CONFIG.soundEnabled) {
    playHeartbeatThump();
  }
}

function stopHeartAnimation() {
  state.spawning = false;
  state.activeItems = [];
  state.settledItems = [];
  state.shimmeringItems.clear();
}

function spawnItem(itemData, index) {
  const dx = (Math.random() - 0.5) * 20; // rng.uniform(-10, 10) in python
  const item = {
    id: index,
    x: itemData.x,
    y: itemData.y,
    text: itemData.text,
    size: itemData.size,
    color: itemData.color,
    rad: itemData.rad,
    edge: itemData.edge,
    f: 0,
    dx: dx,
    flashVal: 0,
    isSettled: false
  };
  state.activeItems.push(item);

  // Play gentle harmonic chime occasionally
  const now = performance.now();
  if (now > state.nextChimeTime) {
    playHarmonicChime(index % CHIME_FREQS.length, 0.7);
    state.nextChimeTime = now + 120 + Math.random() * 80;
  }
}

function mix(a, b, k) {
  return [
    a[0] + (b[0] - a[0]) * k,
    a[1] + (b[1] - a[1]) * k,
    a[2] + (b[2] - a[2]) * k
  ];
}

function clamp(v, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

function rgbString(c, alpha = 1.0) {
  const r = Math.round(clamp(c[0]) * 255);
  const g = Math.round(clamp(c[1]) * 255);
  const b = Math.round(clamp(c[2]) * 255);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* =====================================================================
   MAIN RENDER LOOP (60 FPS)
   ===================================================================== */
function mainAnimationLoop(timestamp) {
  const dt = (timestamp - state.lastFrameTime) / 1000;
  state.lastFrameTime = timestamp;

  // Render ambient background
  renderAmbientParticles();

  // If on hero view, render heart canvas
  if (state.activeView === 'hero') {
    renderHeartFrame(dt);
  }

  requestAnimationFrame(mainAnimationLoop);
}

function renderHeartFrame(dt) {
  const w = window.innerWidth;
  const h = window.innerHeight;

  heartCtx.clearRect(0, 0, w, h);

  // Calculate dynamic responsive scale
  // Heart bounds: width ~ 680, height ~ 680
  const baseDim = 720;
  const minScreenDim = Math.min(w, h * 0.88);
  const scale = Math.max(0.65, Math.min(1.4, minScreenDim / baseDim));

  const cx = w / 2;
  // Center Y shifted slightly upward to center the heart optical mass
  const cy = h / 2 - 20;

  // SPAWNING TICK
  if (state.spawning) {
    const totalItems = HEART_ITEMS.length;
    // Rate in python: len(ORDER) / (DURATION * 1000 / TICK)
    // Here we compute items per second:
    const itemsPerSec = (totalItems / (CONFIG.animDuration * CONFIG.speedMultiplier));
    state.spawnAcc += itemsPerSec * dt;

    while (state.spawnAcc >= 1 && state.spawnIndex < totalItems) {
      state.spawnAcc -= 1;
      spawnItem(HEART_ITEMS[state.spawnIndex], state.spawnIndex);
      state.spawnIndex++;
    }

    if (state.spawnIndex >= totalItems) {
      state.spawning = false;
      setTimeout(() => {
        if (state.activeView === 'hero') {
          statusBadge.style.opacity = '0.5';
          statusText.textContent = '127 multilingual affirmations pulsating in harmony';
        }
      }, 1000);
    }
  }

  // UPDATE ACTIVE ANIMATING ITEMS
  const stillActive = [];
  for (let i = 0; i < state.activeItems.length; i++) {
    const p = state.activeItems[i];
    p.f += (1 / CONFIG.speedMultiplier);
    const u = clamp(p.f / CONFIG.animFrames);
    const e = 1 - Math.pow(1 - u, 3); // Cubic ease-out
    p.ease = e;

    // Flash calculation from Python: 0.75 * sin(pi * clamp((u - 0.55)/0.45))
    const flashProgress = clamp((u - 0.55) / 0.45);
    const flash = 0.75 * Math.sin(Math.PI * flashProgress);
    p.flashVal = flash;

    if (u >= 1) {
      p.isSettled = true;
      state.settledItems.push(p);
    } else {
      stillActive.push(p);
    }
  }
  state.activeItems = stillActive;

  // TRIGGER RANDOM SHIMMER (continuous sparkle when settled)
  if (CONFIG.shimmerEnabled && state.settledItems.length > 0 && Math.random() < 0.12) {
    const randomItem = state.settledItems[Math.floor(Math.random() * state.settledItems.length)];
    if (!state.shimmeringItems.has(randomItem.id)) {
      state.shimmeringItems.set(randomItem.id, {
        intensity: 0.75,
        startTime: performance.now()
      });
      if (Math.random() < 0.25) {
        playHarmonicChime(null, 0.4);
      }
    }
  }

  // UPDATE SHIMMER STATES
  const now = performance.now();
  for (const [id, sh] of state.shimmeringItems.entries()) {
    const elapsed = now - sh.startTime;
    if (elapsed > 400) {
      state.shimmeringItems.delete(id);
    } else {
      sh.intensity = 0.75 * (1 - elapsed / 400);
    }
  }

  // DRAW ALL SETTLED ITEMS FIRST
  for (let i = 0; i < state.settledItems.length; i++) {
    const p = state.settledItems[i];
    drawPhraseItem(p, cx, cy, scale, 1.0, 0, true);
  }

  // DRAW ALL ACTIVE FLYING ITEMS ON TOP
  for (let i = 0; i < state.activeItems.length; i++) {
    const p = state.activeItems[i];
    drawPhraseItem(p, cx, cy, scale, p.ease, p.flashVal, false);
  }
}

function drawPhraseItem(p, cx, cy, scale, ease, flashVal, isSettled) {
  // Coordinate transform: python uses Cartesian (x, -y)
  const finalX = cx + p.x * scale;
  const finalY = cy - p.y * scale;

  let drawX = finalX;
  let drawY = finalY;

  const bgcNorm = [CONFIG.bgColor[0] / 255, CONFIG.bgColor[1] / 255, CONFIG.bgColor[2] / 255];
  let textColor = p.color;

  // Interactive mouse repel effect
  let mouseOffsetDist = 0;
  if (state.mouse.isHover) {
    const mdx = drawX - state.mouse.x;
    const mdy = drawY - state.mouse.y;
    const distSq = mdx * mdx + mdy * mdy;
    if (distSq < 10000) { // 100px radius
      const dist = Math.sqrt(distSq);
      const force = (1 - dist / 100) * 12;
      drawX += (mdx / dist) * force;
      drawY += (mdy / dist) * force;
      mouseOffsetDist = force;
    }
  }

  const fontSize = Math.round(p.size * scale * 1.08);
  heartCtx.font = `bold ${fontSize}px ${CONFIG.fontFamily}`;
  heartCtx.textAlign = 'center';
  heartCtx.textBaseline = 'middle';

  if (!isSettled) {
    // Flying in from above
    const hover = (1 - ease) * CONFIG.liftDistance * scale;
    drawX = finalX + p.dx * (1 - ease) * scale;
    drawY = finalY - hover;

    // Halo shadow
    const haloColor = mix(bgcNorm, [p.color[0] * 0.2, p.color[1] * 0.2, p.color[2] * 0.2], ease * ease);
    heartCtx.fillStyle = rgbString(haloColor, 0.4);
    heartCtx.fillText(p.text, drawX, drawY);

    // Color transition: mix(mix(BGC, c, e^1.5), FLASH, flash)
    const baseCol = mix(bgcNorm, p.color, Math.pow(ease, 1.5));
    textColor = mix(baseCol, CONFIG.flashColor, flashVal);

    // Glowing drop shadow for flying text
    heartCtx.shadowColor = rgbString(p.color, 0.8);
    heartCtx.shadowBlur = 10 * scale;
  } else {
    // Check if shimmering
    const shimmer = state.shimmeringItems.get(p.id);
    if (shimmer) {
      textColor = mix(p.color, CONFIG.flashColor, shimmer.intensity);
      heartCtx.shadowColor = rgbString(CONFIG.flashColor, shimmer.intensity);
      heartCtx.shadowBlur = 14 * shimmer.intensity * scale;
    } else if (mouseOffsetDist > 0) {
      textColor = mix(p.color, CONFIG.flashColor, 0.4);
      heartCtx.shadowColor = 'rgba(255, 100, 140, 0.6)';
      heartCtx.shadowBlur = 12 * scale;
    } else {
      heartCtx.shadowColor = rgbString(p.color, p.edge ? 0.35 : 0.15);
      heartCtx.shadowBlur = p.edge ? 6 * scale : 2;
    }
  }

  // Deep shadow layer
  heartCtx.fillStyle = 'rgba(6, 2, 8, 0.6)';
  heartCtx.fillText(p.text, drawX + 1.5, drawY + 2);

  // Main vibrant text
  heartCtx.fillStyle = rgbString(textColor, 1.0);
  heartCtx.fillText(p.text, drawX, drawY);

  // Reset shadow
  heartCtx.shadowBlur = 0;
}

/* =====================================================================
   AMBIENT BACKGROUND PARTICLES & FLOATING PETALS
   ===================================================================== */
const ambientParticles = [];
const PARTICLE_COUNT = 50;

function initAmbientParticles() {
  ambientParticles.length = 0;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    ambientParticles.push(createParticle());
  }
}

function createParticle(startAtBottom = false) {
  return {
    x: Math.random() * window.innerWidth,
    y: startAtBottom ? window.innerHeight + 20 : Math.random() * window.innerHeight,
    size: 2 + Math.random() * 5,
    speedY: -(0.2 + Math.random() * 0.7),
    speedX: (Math.random() - 0.5) * 0.4,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.02,
    opacity: 0.15 + Math.random() * 0.45,
    isPetal: Math.random() < 0.35,
    hue: 340 + Math.random() * 25 // Rose / Magenta hues
  };
}

function renderAmbientParticles() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  ambientCtx.clearRect(0, 0, w, h);

  if (!CONFIG.particlesEnabled) return;

  for (let i = 0; i < ambientParticles.length; i++) {
    const p = ambientParticles[i];
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.rotationSpeed;

    if (p.y < -30) {
      ambientParticles[i] = createParticle(true);
      continue;
    }

    ambientCtx.save();
    ambientCtx.translate(p.x, p.y);
    ambientCtx.rotate(p.rotation);
    ambientCtx.globalAlpha = p.opacity;

    if (p.isPetal) {
      // Soft floating curved rose petal
      ambientCtx.fillStyle = `hsla(${p.hue}, 85%, 60%, ${p.opacity})`;
      ambientCtx.beginPath();
      ambientCtx.ellipse(0, 0, p.size * 1.8, p.size * 0.9, Math.PI / 4, 0, Math.PI * 2);
      ambientCtx.fill();
    } else {
      // Soft glowing bokeh orb
      const grad = ambientCtx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      grad.addColorStop(0, `hsla(${p.hue}, 95%, 70%, ${p.opacity})`);
      grad.addColorStop(1, 'transparent');
      ambientCtx.fillStyle = grad;
      ambientCtx.beginPath();
      ambientCtx.arc(0, 0, p.size, 0, Math.PI * 2);
      ambientCtx.fill();
    }

    ambientCtx.restore();
  }
}

/* =====================================================================
   PYTHON SCRIPT MODAL & RUNNER
   ===================================================================== */
function initModalCode() {
  pythonCodeContent.textContent = PYTHON_SCRIPT_SOURCE;
}

function openCodeModal() {
  codeModal.classList.add('active');
  codeModal.setAttribute('aria-hidden', 'false');
}

function closeCodeModal() {
  codeModal.classList.remove('active');
  codeModal.setAttribute('aria-hidden', 'true');
}

async function runNativePythonWindow() {
  showToast('Launching Python Tkinter window on your system...');
  try {
    const res = await fetch('/api/run-python', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      showToast('✓ ' + (data.message || 'Python window opened!'));
    } else {
      fallbackRunPythonMessage();
    }
  } catch (e) {
    fallbackRunPythonMessage();
  }
}

function fallbackRunPythonMessage() {
  showToast('To run locally: open terminal and type `py heart_animation.py`');
}

/* =====================================================================
   EVENT LISTENERS & USER CONTROLS
   ===================================================================== */
function setupEventListeners() {
  // 1. Central Hero Button on Landing Page
  enterHeartBtn.addEventListener('click', (e) => {
    initAudio();
    createButtonRipple(e, enterHeartBtn);
    setTimeout(() => {
      switchView('hero');
    }, 260);
  });

  // 2. Back to Landing Page
  backToLandingBtn.addEventListener('click', () => {
    switchView('landing');
  });

  // 3. Replay Button
  replayBtn.addEventListener('click', () => {
    startHeartAnimation();
    showToast('Replaying animation from start');
  });

  dockReplayBtn.addEventListener('click', () => {
    startHeartAnimation();
    showToast('Replaying animation from start');
  });

  // 4. Ambient Audio Toggle
  audioToggleBtn.addEventListener('click', () => {
    initAudio();
    CONFIG.soundEnabled = !CONFIG.soundEnabled;
    if (CONFIG.soundEnabled) {
      audioToggleBtn.classList.add('glass-accent-btn');
      showToast('Ambient celestial sound enabled 🎵');
      playHeartbeatThump();
    } else {
      audioToggleBtn.classList.remove('glass-accent-btn');
      showToast('Sound muted');
    }
  });

  // 5. Code Modal Triggers
  openCodeModalBtn.addEventListener('click', openCodeModal);
  viewScriptBtnLanding.addEventListener('click', openCodeModal);
  closeModalBtn.addEventListener('click', closeCodeModal);

  codeModal.addEventListener('click', (e) => {
    if (e.target === codeModal) closeCodeModal();
  });

  // 6. Copy Code Button
  copyCodeBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(PYTHON_SCRIPT_SOURCE).then(() => {
      copyCodeText.textContent = 'Copied!';
      copyCodeBtn.style.borderColor = 'rgba(100, 255, 150, 0.6)';
      setTimeout(() => {
        copyCodeText.textContent = 'Copy Code';
        copyCodeBtn.style.borderColor = '';
      }, 2000);
      showToast('Python script copied to clipboard!');
    });
  });

  // 7. Native Python Window Triggers
  modalRunPythonBtn.addEventListener('click', runNativePythonWindow);
  dockRunNativeBtn.addEventListener('click', runNativePythonWindow);

  // 8. Speed Buttons
  speedButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      speedButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      CONFIG.speedMultiplier = parseFloat(btn.dataset.speed);
      showToast(`Animation speed set to ${btn.textContent}`);
    });
  });

  // 9. Particle Shower Toggle
  dockParticlesBtn.addEventListener('click', () => {
    CONFIG.particlesEnabled = !CONFIG.particlesEnabled;
    dockParticlesBtn.classList.toggle('active', CONFIG.particlesEnabled);
    showToast(CONFIG.particlesEnabled ? 'Love petals & embers enabled' : 'Particles hidden');
  });

  // 10. Shimmer Toggle
  dockShimmerBtn.addEventListener('click', () => {
    CONFIG.shimmerEnabled = !CONFIG.shimmerEnabled;
    dockShimmerBtn.classList.toggle('active', CONFIG.shimmerEnabled);
    showToast(CONFIG.shimmerEnabled ? 'Sparkling shimmer enabled' : 'Shimmer paused');
  });

  // 11. Interactive Canvas Mouse Hover & Magnetic Ripple
  window.addEventListener('mousemove', (e) => {
    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;
    state.mouse.isHover = true;

    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = '1';
  });

  window.addEventListener('mouseleave', () => {
    state.mouse.isHover = false;
    cursorGlow.style.opacity = '0';
  });

  // 12. Interactive Canvas Click Burst
  heartCanvas.addEventListener('click', (e) => {
    initAudio();
    playHarmonicChime(null, 1.2);
    // Burst small particles around click location
    for (let i = 0; i < 8; i++) {
      const p = createParticle();
      p.x = e.clientX;
      p.y = e.clientY;
      p.speedX = (Math.random() - 0.5) * 4;
      p.speedY = (Math.random() - 0.5) * 4;
      p.opacity = 0.9;
      ambientParticles.push(p);
    }
  });
}

function createButtonRipple(e, btn) {
  const rect = btn.getBoundingClientRect();
  const circle = document.createElement('span');
  const d = Math.max(rect.width, rect.height);
  circle.style.width = circle.style.height = `${d}px`;
  circle.style.left = `${e.clientX - rect.left - d / 2}px`;
  circle.style.top = `${e.clientY - rect.top - d / 2}px`;
  circle.style.position = 'absolute';
  circle.style.borderRadius = '50%';
  circle.style.background = 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,100,140,0.3) 60%, transparent 100%)';
  circle.style.transform = 'scale(0)';
  circle.style.animation = 'rippleExp 0.7s ease-out forwards';
  circle.style.pointerEvents = 'none';

  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 750);
}

// Ripple keyframes
const styleSheet = document.createElement('style');
styleSheet.textContent = `
@keyframes rippleExp {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}
`;
document.head.appendChild(styleSheet);
