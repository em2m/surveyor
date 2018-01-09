export class RestQuery {
  aggs: any[] = [];
  bbox: any; // TODO: ADD SUPPORT FOR JTS ENVELOPE
  constraints: Array<Constraint> = [];
  fields: Array<Field> = [];
  geoField: string;
  limit = 10;
  offset = 0;
  q: string;
  sorts: Array<Sort> = [];

  constructor() {
  }
}

export class Query {
  aggs: { [ key: string ]: Aggregation; } = {};
  bbox: any; // TODO: ADD SUPPORT FOR JTS ENVELOPE
  filters: { [ key: string ]: Filter; } = {};
  fields: Array<Field> = [];
  fieldSet: string;
  geoField: string;
  limit = 10;
  offset = 0;
  headers: { [ key: string ]: any; } = {};
  q: string;
  sorts: Array<Sort> = [];

  constructor() {
  }
}

export class Field {
  name?: string;
  label?: string;
  expr?: string;
  settings?: { [ key: string ]: any; } = {};

  constructor() {
  }
}

export class Constraint {
  field: string;
  values: Array<string>;
}

export class Filter {
  name: string;
  type: string;
  clause = 'MUST';     // MUST, MUST_NOT, SHOULD

  constructor() {
  }
}

export class TermFilter extends Filter {
  query: string;
  field: string;
  type = "term";

  constructor() {
    super();
  }
}

export class QueryFilter extends Filter {
  query: string;
  operator = 'AND';
  type = "query";

  constructor() {
    super();
  }
}

export class RangeFilter extends Filter {
  type = "range";
  field: string;
  gte: string;
  gt: string;
  lte: string;
  lt: string;
  time_zone: string;

  constructor() {
    super();
  }
}

export class Aggregation {
  name: string;
  type: string;
  field: string;
  order: Sort;
  limit: number;
  time_zone: string;
  aggs: { [ key: string ]: Aggregation; } = {};

  constructor() {
  }
}

export class Sort {
  field: string;
  direction: string;          // Ascending, Descending
  type = 'Lexical';   // Count, Lexical, None

  constructor(field?: string, direction: string = "Descending") {
    this.field = field;
    this.direction = direction;
  }
}

export class Results {
  aggs: { [ key: string ]: AggregationResults; } = {};
  items: Array<any> = [];
  query: Query;
  totalItems = 0;
  bbox: any; // TODO: ADD SUPPORT FOR JTS ENVELOPE
  headers: { [ key: string ]: any; } = {};
  fields: Array<string> = [];

  constructor() {
  }
}

export class AggregationResults {
  buckets: Array<Bucket> = [];
  stats: Stats;
  name: string;

  constructor() {
  }
}

export class Bucket {
  count: number;
  label: string;
  key: any;
  stats: Stats;
  aggs: { [ key: string ]: AggregationResults; } = {};

  constructor() {
  }
}

export class Stats {
  count: number;
  sum: number;
  min: number;
  sumOfSquares: number;
  variance: number;
  stdDeviation: number;

  constructor() {
  }
}
