import { FormControl } from '@angular/forms';
import { SurveyorValidators } from '@em2m/surveyor';

describe('URL validation', () => {
  const zipValidator = SurveyorValidators.isValidUrl;

  it('should validate url', () => {
    // See valid URLs in RFC3987 (http://tools.ietf.org/html/rfc3987)
    expect(zipValidator(new FormControl('http://server:123/path'))).toBe(true);
    expect(zipValidator(new FormControl('https://server:123/path'))).toBe(true);
    expect(zipValidator(new FormControl('file:///home/user'))).toBe(true);
    expect(
      zipValidator(new FormControl('mailto:user@example.com?subject=Foo'))
    ).toBe(true);
    expect(zipValidator(new FormControl('r2-d2.c3-p0://localhost/foo'))).toBe(
      true
    );
    expect(zipValidator(new FormControl('abc:/foo'))).toBe(true);
    expect(zipValidator(new FormControl('http:'))).toBe(false);
    expect(zipValidator(new FormControl('a@B.c'))).toBe(false);
    expect(zipValidator(new FormControl('a_B.c'))).toBe(false);
    expect(zipValidator(new FormControl('0scheme://example.com'))).toBe(false);
    expect(zipValidator(new FormControl('http://example.com:9999/~~``'))).toBe(
      false
    );
  });
});
