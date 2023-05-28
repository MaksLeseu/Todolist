
describe('addItemFrom', () => {
    it ('base example, visually looks correct', async () => {
        await page.goto('http://localhost:6006/iframe.html?args=&id=todolists-additemform--add-item-form-story&viewMode=story')
        await page.waitForTimeout(3000)
        const image = await page.screenshot()

        expect(image).toMatchImageSnapshot()
    })
})