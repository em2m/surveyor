import { UntypedFormControl } from '@angular/forms';
import { SurveyorValidators } from '@em2m/surveyor';

describe('URL validation', () => {
  const zipValidator = SurveyorValidators.isValidUrl;

  it('should validate url', () => {
    // See valid URLs in RFC3987 (http://tools.ietf.org/html/rfc3987)
    expect(zipValidator(new UntypedFormControl('http://server:123/path'))).toBe(true);
    expect(zipValidator(new UntypedFormControl('https://server:123/path'))).toBe(true);
    expect(zipValidator(new UntypedFormControl('file:///home/user'))).toBe(true);
    expect(
      zipValidator(new UntypedFormControl('mailto:user@example.com?subject=Foo'))
    ).toBe(true);
    expect(zipValidator(new UntypedFormControl('r2-d2.c3-p0://localhost/foo'))).toBe(
      true
    );
    expect(zipValidator(new UntypedFormControl('abc:/foo'))).toBe(true);
    expect(zipValidator(new UntypedFormControl('http:'))).toBe(false);
    expect(zipValidator(new UntypedFormControl('a@B.c'))).toBe(false);
    expect(zipValidator(new UntypedFormControl('a_B.c'))).toBe(false);
    expect(zipValidator(new UntypedFormControl('0scheme://example.com'))).toBe(false);
    expect(zipValidator(new UntypedFormControl('http://example.com:9999/~~``'))).toBe(
      false
    );
  });
});
