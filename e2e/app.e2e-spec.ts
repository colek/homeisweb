import { HomeisclientPage } from './app.po';

describe('homeisclient App', function() {
  let page: HomeisclientPage;

  beforeEach(() => {
    page = new HomeisclientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
