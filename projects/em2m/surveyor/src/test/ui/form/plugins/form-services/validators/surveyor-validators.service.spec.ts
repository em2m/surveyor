import { FormControl } from '@angular/forms';
import { SurveyorValidators } from '@em2m/surveyor';

describe('URL validation', () => {
  const urlValidator = SurveyorValidators.isValidUrl;

  it('should validate url', () => {
    // See valid URLs in RFC3987 (http://tools.ietf.org/html/rfc3987)
    expect(urlValidator(new FormControl('http://server:123/path'))).toEqual({
      invalidUrl: false
    });
    expect(urlValidator(new FormControl('https://server:123/path'))).toEqual({
      invalidUrl: false
    });
    expect(urlValidator(new FormControl('file:///home/user'))).toEqual({
      invalidUrl: false
    });
    expect(
      urlValidator(new FormControl('mailto:user@example.com?subject=Foo'))
    ).toEqual({ invalidUrl: false });
    expect(
      urlValidator(new FormControl('r2-d2.c3-p0://localhost/foo'))
    ).toEqual({
      invalidUrl: false
    });
    expect(urlValidator(new FormControl('abc:/foo'))).toEqual({
      invalidUrl: false
    });
    expect(urlValidator(new FormControl('http:'))).toEqual({
      invalidUrl: true
    });
    expect(urlValidator(new FormControl('a@B.c'))).toEqual({
      invalidUrl: true
    });
    expect(urlValidator(new FormControl('a_B.c'))).toEqual({
      invalidUrl: true
    });
    expect(urlValidator(new FormControl('0scheme://example.com'))).toEqual({
      invalidUrl: true
    });
    expect(
      urlValidator(new FormControl('http://example.com:9999/~~``'))
    ).toEqual({
      invalidUrl: true
    });
  });
});
