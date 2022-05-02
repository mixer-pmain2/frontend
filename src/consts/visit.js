export const visitTypeGroup = [
  [2, 524288, 1, 4, 8, 256, 1073741824],
  [8192, 16384, 64, 32, 1048576, 2097152, 8388608, 262144, 131072, 134217728],
  [2048, 16777216, 33554432, 512, 4194304, 268435456, 536870912],
  [128, 32768, 16]
]

export const visitHomeTypeGroup = [
  [2, 524288, 1, 4, 8, 256],
  [8192, 16384, 64, 32, 1048576, 2097152, 8388608, 262144],
  [2048, 16777216, 33554432, 512, 4194304],
  [128, 32768, 16]
]

export const type = {
  WorkWithDocument: 131072
}

export const srcReason = [
  {title: "Согласие", value: 0},
  {title: "Отказ", value: 1}
]

export const messageNotValidAge = {
  sup: "На приеме пациент младше 18-ти лет. Записать?",
  sub: "На приеме пациент старше 18-ти лет. Записать?",
}

export const profVisit = {
  maxCount: 20
}