export default class {
    levelid: number
    userid: string
    progress: number
    timestamp: number
    flPt: number
    dlPt: number
    refreshRate: number
    videoLink: string
    mobile: boolean
    isChecked: boolean
    comment: string
    
    constructor(userid: string, levelid: number) {
        this.levelid = levelid
        this.userid = userid
        this.progress = NaN
        this.timestamp = NaN
        this.flPt = NaN
        this.dlPt = NaN
        this.refreshRate = NaN
        this.videoLink = ''
        this.mobile = false
        this.isChecked = false
        this.comment = ''
    }
}