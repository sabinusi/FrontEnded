import { FrontEndedPage } from './app.po';

describe('front-ended App', function() {
  let page: FrontEndedPage;

  beforeEach(() => {
    page = new FrontEndedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
