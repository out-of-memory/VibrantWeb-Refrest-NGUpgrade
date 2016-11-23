import { VibrantWebRefreshPage } from './app.po';

describe('vibrant-web-refresh App', function() {
  let page: VibrantWebRefreshPage;

  beforeEach(() => {
    page = new VibrantWebRefreshPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
