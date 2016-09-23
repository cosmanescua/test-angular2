package it.kirey.kfuture.security.transfer;

/**
 * Class used for token transfer from server to client
 * @author Vladimir
 *
 */
public class TokenTransfer {

	private final String token;

	public TokenTransfer(String token) {
		this.token = token;
	}

	public String getToken() {
		return this.token;
	}

}