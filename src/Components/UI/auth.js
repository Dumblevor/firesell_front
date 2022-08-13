
export function getLoggedInUserId() {
  if (!localStorage.getItem("token")) return false
  const token = localStorage.getItem("token")

  const middlePart = token.split('.')[1]
  const decodedString = window.atob(middlePart)
  const decodedObj = JSON.parse(decodedString)

  return decodedObj.userId
}

export function isCreator(userIdToCompare) {
  if (!userIdToCompare) return false
  if (userIdToCompare === getLoggedInUserId()) {
    return true
  } else return false

}