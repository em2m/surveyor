export interface Envelope extends Array<number> {
}

export class Query {
  constructor(public op: string) { }
}

export class BoolQuery extends Query {
  constructor(opType: string, public of: Array<Query>) {
    super(opType);
  }
}

export abstract class FieldedQuery extends Query {
  constructor(public field: string, opType: string) {
    super(opType);
  }
}

export class LuceneQuery extends Query {
  constructor(public query: string, public defaultField: string = null) {
    super(OperationType.LUCENE);
  }
}

export class MatchAllQuery extends Query {
  constructor() {
    super(OperationType.ALL);
  }
}

export class NamedQuery extends Query {
  constructor(public name: string, public value: any = null, public label?: string) {
    super(OperationType.NAMED);
  }
}

export class BboxQuery extends FieldedQuery {
  constructor(field: string, public value: Envelope) {
    super(field, OperationType.BBOX);
  }
}

export class TermQuery extends FieldedQuery {
  constructor(field: string, public value: any, public label?: string) {
    super(field, OperationType.TERM);
  }
}

export class TermsQuery extends FieldedQuery {
  constructor(field: string, public value: Array<any>, public label?: any) {
    super(field, OperationType.TERMS);
  }
}

export class MatchQuery extends FieldedQuery {
  constructor(field: string, public value: any, public label?: any) {
    super(field, OperationType.MATCH);
  }
}

export class PhraseQuery extends FieldedQuery {
  constructor(field: string, public value: Array<string>, public label?: any) {
    super(field, OperationType.PHRASE);
  }
}

export class PrefixQuery extends FieldedQuery {
  constructor(field: string, public value: string, public label?: string) {
    super(field, OperationType.PREFIX);
  }
}

export class WildcardQuery extends FieldedQuery {
  constructor(field: string, public value: string, public label?: string) {
    super(field, OperationType.WILDCARD);
  }
}

export class RangeQuery extends FieldedQuery {
  constructor(field: string, public lt, public lte, public gt, public gte, public timeZone: string, public label?: string) {
    super(field, OperationType.RANGE);
  }
}

export class DateRangeQuery extends FieldedQuery {
  constructor(field: string, public lt, public lte, public gt, public gte, public timeZone: string, public label?: string) {
    super(field, OperationType.DATE);
  }
}

export class RegexQuery extends FieldedQuery {
  constructor(field: string, public value, public label?: string) {
    super(field, OperationType.REGEX);
  }
}

export class ExistsQuery extends FieldedQuery {
  constructor(field: string, public value: boolean, public label?: string) {
    super(field, OperationType.EXISTS);
  }
}

export class AndQuery extends BoolQuery {
  constructor(of: Array<Query>) {
    super(OperationType.AND, of);
  }
}

export class NotQuery extends BoolQuery {
  constructor(of: Array<Query>) {
    super(OperationType.NOT, of);
  }
}

export class OrQuery extends BoolQuery {
  constructor(of: Array<Query>) {
    super(OperationType.OR, of);
  }
}

export class OperationType {
  static NOT = 'not';
  static AND = 'and';
  static OR = 'or';
  static DATE = 'date_range';
  static RANGE = 'range';
  static NATIVE = 'native';
  static PHRASE = 'phrase';
  static TERM = 'term';
  static TERMS = 'terms';
  static REGEX = 'regex';
  static PREFIX = 'prefix';
  static WILDCARD = 'wildcard';
  static MATCH = 'match';
  static EXISTS = 'exists';
  static LUCENE = 'lucene';
  static NAMED = 'named';
  static BBOX = 'bbox';
  static ALL = 'all';
}

export interface Agg {
  key: string;
  op: string;
  field?: string;
  sort?: AggSort;
  label?: string;
  size?: number;
  time_zone?: string;
  multiSelect?: boolean;
  aggs?: { [ key: string ]: Agg; };
  type?: string;
}

export class Field {
  name?: string;
  label?: string;
  expr?: string;
  settings?: { [ key: string ]: any; } = {};

  constructor() {
  }
}

export class AggSort {
  constructor(public type?: string, public direction?: string) {}

  static lexicalDesc(): AggSort {
    return new AggSort('Lexical', 'Descending');
  }

  static lexicalAsc(): AggSort {
    return new AggSort('Lexical', 'Ascending');
  }

  static countDesc(): AggSort {
    return new AggSort('Count', 'Descending');
  }

  static countAsc(): AggSort {
    return new AggSort('Count', 'Ascending');
  }

}

export class Sort {
  constructor(public field?: string, public direction: string = 'Descending') {}
}

export class Results {
  aggs: { [ key: string ]: AggResults; } = {};
  items: Array<any> = [];
  query: Query;
  totalItems = 0;
  bbox: any; // TODO: ADD SUPPORT FOR JTS ENVELOPE
  headers: { [ key: string ]: any; } = {};
  fields: Array<string> = [];

  constructor() {
  }
}

export class AggResults {
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
  aggs: { [ key: string ]: AggResults; } = {};

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
