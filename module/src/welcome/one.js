function one(name,gpname,pp,bg,member,gcicon) {
	const data = `https://sanslinedev.tech/api/maker/welcome?name=${name}&gpname=${gpname}&member=${member}&pp=${pp}&bg=${bg}&apikey=Elistz`
	let result = {
		data
	}
	return result
}

module.exports = one