export const imageFileFilter = (req: Request, file: Express.Multer.File, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new Error('Only image files are allowed!'), false)
    }
    callback(null, true)
}

export const editFileName = (req: any, file: Express.Multer.File, callback: any) => {
    const name = file.originalname.split('.')[0]
    const randomName = Array(4).fill(null).map(() => Math.round(Math.random() * 16).toString()).join('')
    callback(null, `${name}-${randomName}-${new Date().getTime()}`)
}

