export function getTimeModule(timezone: string) {
    return `${new Date().toLocaleString("zh-CN", { timeZone: timezone })}`;
}